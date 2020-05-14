const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));

let todoList = [
  {
    id: 1,
    todo: 'Implement a REST API',
  },
  {
    id: 2,
    todo: 'Build a frontend',
  },
  {
    id: 3,
    todo: '???',
  },
  {
    id: 4,
    todo: 'Profit!',
  },
];

// GET /api/todos
app.get('api/todos', (req, res)=>{
  res.json(todoList)
});

// GET /api/todos/:id
app.get('/api/todos/:id', (req, res)=>{
  const todo = todoList.find((item)=>{
    return (item.id == req.params.id);
  });
  res.json(todo)
});

// POST /api/todos


// PUT /api/todos/:id


// DELETE /api/todos/:id


app.listen(3000, function () {
  console.log('Todo List API is now listening on port 3000...http://localhost:3000');
});
