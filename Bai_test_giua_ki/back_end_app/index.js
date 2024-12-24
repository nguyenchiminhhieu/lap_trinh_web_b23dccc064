const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todosRoutes');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:3001'
}));

app.use(bodyParser.json());
app.use('/api', todoRoutes);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});