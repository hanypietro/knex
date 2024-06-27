// index.js
const express = require('express');
const db = require('./db');

const app = express();
const port = 3000;

app.use(express.json());

// Example route to get all items from a table called 'items'
app.get('/items', async (req, res) => {
  try {
    const items = await db.select('*').from('items');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Example route to add a new item to the 'items' table
app.post('/items', async (req, res) => {
  try {
    const [id] = await db('items').insert(req.body).returning('id');
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
