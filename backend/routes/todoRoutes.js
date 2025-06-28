const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Create
router.post('/', async (req, res) => {
  const newTodo = new Todo(req.body);
  const saved = await newTodo.save();
  res.json(saved);
});

// Read
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Update
router.put('/:id', async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
