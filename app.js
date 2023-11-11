const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Read the data from the JSON file
const USERS = JSON.parse(fs.readFileSync('users.json', 'utf8'));



// GET /users
app.get('/users', (req, res) => {
  res.json(USERS.map(user => ({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email
  })));
});

// GET /users/:id
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = USERS.find(u => u.id === userId);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    favorite_food: user.favorite_food
  });
});

// POST /login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = USERS.find(u => u.email === email && u.password === password);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json({ id: user.id });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
