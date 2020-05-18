const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// adding express view engines
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));

let todoList = [
  {
    id: 1,
    description: 'Implement a REST API',
  },
  {
    id: 2,
    description: 'Build a frontend',
  },
  {
    id: 3,
    description: '???',
  },
  {
    id: 4,
    description: 'Profit!',
  },
];

// GET for /about
app.get('/about', (req, res)=>{
  res.render('about',{
    title: 'About',
    descriptions: todoList,
  })
});


app.get('/', (req, res)=>{
  res.render('index',{
    title: 'Todo App',
    descriptions: todoList,
  })
});


// GET /api/todos
app.get('/api/todos/', (req, res)=>{
  console.log(todoList)
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
app.post('/api/todos/', (req, res)=>{
  let newTodo = req.body;
  let newId = todoList.reduce((prev, current)=>{
    if (current.id > prev.id){
      return current;
    }
    else {
          return prev
        }
  }).id + 1;
  newTodo.id = newId;
  todoList.push(newTodo);
  console.log(todoList);
  res.json(newTodo);
});

// PUT /api/todos/:id
app.put('/api/todos/:id', (req, res)=>{
  let todo = todoList.find((item)=>{
    return (item.id == req.params.id);
  });
  todo.description = req.body.description;
  res.json(todo);
});

// DELETE /api/todos/:id
app.delete('/api/todos/:id', (req, res)=>{
  todoList = todoList.filter((todo)=>{
    return todo.id !== Number(req.params.id);
  });
  res.json(todoList);
});











app.listen(3000, function () {
  console.log('Todo List API is now listening on port 3000...http://localhost:3000');
});
