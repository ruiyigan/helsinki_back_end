const { response } = require('express')
const express = require('express') // require is install basically 
const app = express() // kinda by default 
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => { 
  response.json(persons)
})

app.get('/info', (request, response) => { // by default when you open the link is auto get. basically backend is saying what happens what to do when front end give all these requests
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id != id)

  response.status(204).end()
})

app.use(express.json())


app.post('/api/persons', (request, response) => {
  const maxID = persons.length > 0 
        ? Math.max(...persons.map(n => n.id))
        : 0
  const person = request.body
  const name = person.name
  if (person.name === "") {
    return response.status(400).json({
      error: 'name missing'
    })
  } else if (person.number === ""){ // or use !person.number the truthy and falsey thing
    return response.status(400).json({
      error: 'number missing'
    })
  } else if (persons.find(person => person.name === name)) {
    return response.status(400).json({
      error: 'repeated name'
    })
  } else {
    person.id = maxID + 1
    persons = persons.concat(person)
    response.json(person)
  }
})

app.put('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const newPerson = request.body
  persons = persons.map(person => person.id !== id ? person : newPerson)
  response.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})