const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const port = 3001;

let id = 3;

const pets = [
  {
    "name": 'spot',
    "type": 'dog',
    "breed": 'poodle',
    "color": 'black',
    "owner": 'chris tucker',
    "id": 1,
  },
  {
    name: 'coco',
    type: 'dog',
    breed: 'terrier',
    color: 'brown',
    owner: 'mani',
    id: 2,
  }
];

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/pets', (req, res) => {
  res.json(pets);
});

app.get('/pets/:petId', (req, res) => {
  const pet = pets.find(pet => pet.id === +req.params.petId)

  if (!pet) {
    console.error(`Pet ID ${req.params.petId} was not found`);
    return res.status(404).send();
  }

  res.json(pet);
});

app.post('/pets', (req, res) => {
  const pet = {
    ...req.body,
    id: id++
  };

  pets.push(pet);
  res.status(201).json(pet);
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));