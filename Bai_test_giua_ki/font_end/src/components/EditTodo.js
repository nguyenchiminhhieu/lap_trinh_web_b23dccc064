import React, { useState } from 'react';

const EditTodo = ({ todo, onUpdate }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [dueDate, setDueDate] = useState(todo.due_date);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTodo = { 
      id: todo.id, 
      title, 
      description, 
      due_date: dueDate 
    };

    console.log('Submitting updatedTodo:', updatedTodo); // Thêm log
    onUpdate(updatedTodo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Todo</h2>
      <label>
        Title:
        <input
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </label>
      <label>
        Description:
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
      </label>
      <label>
        Due Date:
        <input 
          type="date" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
        />
      </label>
      <button type="submit">Update Todo</button>
    </form>
  );
};

export default EditTodo;