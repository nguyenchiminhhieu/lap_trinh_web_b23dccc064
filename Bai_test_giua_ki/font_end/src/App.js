import React, { useState } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import EditTodo from './components/EditTodo';
import axios from 'axios';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

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
      await axios.put(`http://localhost:3000/api/todos/${updatedTodo.id}`, updatedTodo);
      setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))); 
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };
  

  return (
    <div className="App">
      <h1>Todo List</h1>
      <AddTodo onAdd={handleAddTodo} />
      {editTodo && <EditTodo todo={editTodo} onUpdate={handleUpdateTodo} />}
      <TodoList todos={todos} onEdit={handleEditTodo} />
    </div>
  );
};

export default App;