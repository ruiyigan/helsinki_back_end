const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url =
  `mongodb+srv://admin:${password}@cluster0.gtuxy.mongodb.net/helsinki_phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Phonebook', phonebookSchema)

const person = new Person({
  name: newName,
  number: newNumber
})

if (process.argv.length === 5) {
    person.save().then(result => {
        console.log(`added ${newName} number ${newNumber} to phonebook!`)
        mongoose.connection.close()
      })
}

if (process.argv.length === 3) {
    console.log("phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
        console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}