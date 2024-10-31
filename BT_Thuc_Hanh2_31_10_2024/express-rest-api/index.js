const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());  

const todosRouter = require('./routers/todo.js');
app.use('/todos', todosRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ]);
});
app.post('/users', (req, res) => {
  const newUser = req.body;
  res.status(201).json({ message: 'Người dùng mới đã được tạo', user: newUser });
});
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  res.json({ message: `Người dùng có ID ${userId} đã được cập nhật`, updatedData });
});
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: `Người dùng có ID ${userId} đã bị xóa` });
});
