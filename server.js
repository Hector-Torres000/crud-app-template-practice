const { json } = require('body-parser');
const express = require('express');
const app = express();

app.use(express.json());
let yellowBooks = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/', (request, response) => {
  const hello = '<h1>Hello World</h1>';
  response.send(hello);
});

app.get('/api/persons', (request, response) => {
  response.json(yellowBooks);
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = yellowBooks.find((person) => person.id == id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get('/info', (request, response) => {
  const numPersons = yellowBooks.length;
  const time = new Date();
  response.send(`
    <p>Phonebook has info for ${numPersons} people</p>
    <p>${time}</p>
    `);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  yellowBooks = yellowBooks.filter((person) => person.id != id);
  response.status(204).end();
});

const generateId = () => {
  const maxId =
    yellowBooks.length > 0
      ? Math.max(...yellowBooks.map((person) => person.id))
      : 0;
  return maxId + 1;
};

app.post('/api/persons', (request, response) => {
  const names = yellowBooks.map((person) => person.name);
  const person = request.body;
  if (!person.name) {
    return response.status(400).json({ error: 'name is missing' });
  } else if (!person.number) {
    return response.status(400).json({ error: 'number is missing' });
  } else if (names.includes(person.name)) {
    return response.status(400).json({ error: 'name already exist' });
  }

  const newPerson = {
    id: generateId(),
    name: person.name,
    number: person.number,
  };
  yellowBooks = yellowBooks.concat(newPerson);
  response.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
