import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import './TodoItem.css';

const TodoList = ({ onEdit }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, [todos]); 
  

  const handleComplete = (id) => {
    // Cập nhật trạng thái hoàn thành task
    axios.put(`http://localhost:3000/api/todos/${id}`, { completed: true })
      .then(() => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: true } : todo));
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    // Xoá task
    axios.delete(`http://localhost:3000/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onComplete={handleComplete} 
          onDelete={handleDelete} 
          onEdit={onEdit} 
        />
      ))}
    </div>
  );
};

export default TodoList;