const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.mongourl

const phonebookSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    
    number: {
        type: String,
        minLength: 8,
        required: true
    }
    })
    
phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Phonebook', phonebookSchema)
