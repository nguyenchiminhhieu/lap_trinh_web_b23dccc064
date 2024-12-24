// TodoItem.js
import React from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onComplete, onDelete, onEdit }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-details">
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
        <p>Due Date: {todo.due_date}</p>
      </div>
      <div className="todo-actions">
        {!todo.completed && <button onClick={() => onComplete(todo.id)}>Complete</button>}
        <button onClick={() => onEdit(todo)}>Edit</button>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;