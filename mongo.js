const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
const url = 'mongodb://user:passwd@ds139883.mlab.com:39883/fullstack-phonebook'

const args = process.argv.slice(2)

mongoose.connect(url, {useNewUrlParser: true})

const Note = mongoose.model('Person', {
  name: String,
  number: String
})

switch (args.length) {
 case 0:
 console.log("Puhelinluettelo:")
 Note
   .find({})
   .then(result => {
     result.forEach(note => {
       console.log(`${note.name} ${note.number}`)
     })
     mongoose.connection.close()
   })
 break;
 case 2:
 console.log(`Lisätään henkilö ${args[0]} numero ${args[1]} luetteloon`)
 const note = new Note({
   name: args[0],
   number: args[1]
 })

 note
   .save()
   .then(response => {
     mongoose.connection.close()
   })
 break;
 default:
 console.log(`Error: Wrong number of arguments ${args.length}. Was expecting 2.`)
 mongoose.connection.close()
}
