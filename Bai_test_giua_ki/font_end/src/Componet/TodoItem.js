import React from 'react';

const TodoItem = ({ todo, onComplete, onDelete, onEdit }) => {
  return (
    <div className="todo-item">
      <input 
        type="radio" 
        checked={todo.completed} 
        onChange={() => onComplete(todo.id)} 
      />
      <span>{todo.title}</span>
      <span>{todo.description}</span>
      <span>{todo.due_date}</span>
      <button onClick={() => onEdit(todo)}>Edit</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoItem;