const { response } = require('express')
require('dotenv').config()
const Person = require('./models/person') // importing model
// use express
// imported middlewares express, cors
const express = require('express') // require is install basically 
const cors = require('cors')
const app = express() // kinda by default 
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
// self created middleware unknowin endpoint and errorhandler
const unknownEndpoint = (request, response) => { //checking if endpoint known or not. like api/persons is known but api/personssss is not known. ID not really known or not but more of whether its exists
  response.status(404).send({ error: 'unknown endpoint' })
}
// handler of requests with unknown endpoint
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}
// handler of requests with result to errors

app.get('/api/persons', (request, response) => { // working
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// Person is probably an object instead of an array. Need to edit?

app.get('/info', (request, response) => { // by default when you open the link is auto get. basically backend is saying what happens what to do when front end give all these requests
  response.send(
    `<p>Phonebook has info for ${Person.length} people</p> 
    <p>${new Date()}</p>
    `)
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndRemove(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  const name = body.name
  if (name === "") {
    return response.status(400).json({
      error: 'name missing'
    })
  } else if (body.number === ""){ // or use !person.number the truthy and falsey thing
    return response.status(400).json({
      error: 'number missing'
    })
  } 
  // else if (Person.find(person => person.name === name)) {
  //   return response.status(400).json({
  //     error: 'repeated name'
  //   })
  // } 
  else {
    const person = new Person({
      name: body.name,
      number: body.number
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  }
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const id = request.params.id
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(id, person, { new: true}) // We added the optional { new: true }parameter, which will cause our event handler to be called with the new modified document instead of the original. I think affects your returendPerson at the front end. new:true returns the updated one
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint) //put at the bottom
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
