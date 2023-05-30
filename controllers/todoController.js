const Todo = require('../models/Todo');

// Get all todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve todos' });
  }
};

// Create a new todo
const createTodo = async (req, res) => {
    try {
      const { title, description, completed } = req.body;
      const userId = req.user.id; // Assuming you have implemented user authentication and have access to the authenticated user's ID
  
      const todo = new Todo({
        user: userId,
        title,
        description,
        completed,
      });
  
      const newTodo = await todo.save();
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create a new todo' });
    }
  };

// Get a single todo by ID
const getTodoById = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve the todo' });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const { title, description, completed } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      todoId,
      { title, description, completed },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update the todo' });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete the todo' });
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
};
