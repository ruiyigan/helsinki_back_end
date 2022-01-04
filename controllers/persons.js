const personsRouter = require('express').Router()
const Person = require('../models/person') // importing model

personsRouter.get('/', (request, response) => { // working
    Person.find({}).then(persons => {
      response.json(persons)
    })
})
  
  // Person is probably an object instead of an array. Need to edit?
  
personsRouter.get('/:id', (request, response, next) => {
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

personsRouter.delete('/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndRemove(id)
        .then(() => {
        response.status(204).end()
        })
        .catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
    const body = request.body
    const name = body.name
    if (name === '') {
        return response.status(400).json({
        error: 'name missing'
        })
    } else if (body.number === ''){ // or use !person.number the truthy and falsey thing
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

        person.save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedAndFromattedPerson => {
            response.json(savedAndFromattedPerson)
        })
        .catch(error => next(error))
    }
})

personsRouter.put('/:id', (request, response, next) => {
    const body = request.body
    const id = request.params.id
    const person = {
        name: body.name,
        number: body.number,
    }
    Person.findByIdAndUpdate(id, person, { new: true}) // We added the optional { new: true }parameter, which will cause our event handler to be called with the new modified document instead of the original. I think affects your returendPerson at the front end. new:true returns the updated one
        .then(updatedPerson => {
        response.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

module.exports = personsRouter
