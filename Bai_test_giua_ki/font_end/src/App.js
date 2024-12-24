// App.js
import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import EditTodo from './components/EditTodo';
import axios from 'axios';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/todos');
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (newTodo) => {
    try {
      const response = await axios.post('http://localhost:3000/api/todos', newTodo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleEditTodo = (todo) => {
    setEditTodo(todo);
  };

  const handleUpdateTodo = async (updatedTodo) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/todos/${updatedTodo.id}`, 
        updatedTodo,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setTodos(
        todos.map((todo) => (todo.id === updatedTodo.id ? response.data : todo))
      );
      setEditTodo(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/todos/${id}`, { completed: true });
      setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: true } : todo));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Todo List</h1>
      </div>
      <div className="container">
        <div className="add-todo-section">
          <AddTodo onAdd={handleAddTodo} />
        </div>
        <div className="edit-todo-section">
          {editTodo && <EditTodo todo={editTodo} onUpdate={handleUpdateTodo} />}
        </div>
        <div className="todo-list-section">
          <TodoList todos={todos} onEdit={handleEditTodo} />
        </div>
      </div>
    </div>
  );
};

export default App;