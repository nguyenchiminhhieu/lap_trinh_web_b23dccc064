import React, { useState } from 'react';
import axios from 'axios';

const EditTodo = ({ todo, onUpdate }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [dueDate, setDueDate] = useState(todo.due_date);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTodo = { ...todo, title, description, due_date: dueDate };

    try {
      await axios.put(`http://localhost:3000/api/todos/${todo.id}`, updatedTodo);
      onUpdate(updatedTodo); 
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Todo</h2>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Due Date:
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </label>
      <button type="submit">Update Todo</button>
    </form>
  );
};

export default EditTodo;