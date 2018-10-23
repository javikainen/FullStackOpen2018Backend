const mongoose = require('mongoose')

const url = 'mongodb://user:passwd@ds139883.mlab.com:39883/fullstack-phonebook'

mongoose.connect(url, {useNewUrlParser: true})

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person
