const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('reqbody', (req) => {
  return JSON.stringify(req.body)
})

app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :reqbody :status :res[content-length] - :response-time ms'))
app.use(express.static('build'))

app.get('/api/persons', (req, res) => {
  Person
    .find({}, { __v: 0 })
    .then(people => {
      res.json(people.map(Person.format))
    })
    .catch(error => {
      console.log(error)
    })
})

app.get('/info', (req, res) => {
  Person
    .find({}, { __v: 0 })
    .then(people => {
      const page =  `
      <p>
        Puhelinluettelossa on ${people.length} henkilön tiedot
      </p>
      <p>
        ${Date()}
      </p>`
      res.send(page)
    })
    .catch(error => {
      console.log(error)
    })
})

app.get('/api/persons/:id', (req, res) => {
  Person
    .find({ _id: req.params.id }, { __v: 0 })
    .then(person => {
      console.log(person[0])
      if (person[0]) {
        res.json(Person.format(person[0]))
      } else {
        res.status(404).end()
      }
    })
    .catch(() => {
      res.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/persons/:id', (req, res) => {
  Person
    .findOneAndDelete({ _id: req.params.id })
    .then(() => {
      res.status(204).end()
    })
    .catch(() => {
      res.status(400).send({ error: 'malformatted id' })
    })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === undefined) {
    return res.status(400).json({ error: 'Missing field: name' })
  }
  if (body.number === undefined) {
    return res.status(400).json({ error: 'Missing field: number' })
  }
  Person
    .find({ name: body.name }, { __v: 0 })
    .then(result => {
      if (result.length === 0) {
        const person = new Person({
          name: body.name,
          number: body.number,
        })
        person
          .save()
          .then(response => {
            res.json(Person.format(response))
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        res.status(400).json({ error: 'Name must be unique' })
      }
    })
    .catch(error => {
      console.log(error)
    })
})

app.put('/api/persons/:id', (req, res) => {
  const body = req.body

  if (body.name === undefined) {
    return res.status(400).json({ error: 'Missing field: name' })
  }
  if (body.number === undefined) {
    return res.status(400).json({ error: 'Missing field: number' })
  }

  const newPerson = {
    name: body.name,
    number: body.number,
  }

  Person
    .findOneAndUpdate({ _id: req.params.id }, newPerson, { new: true })
    .then(updatedPerson => {
      res.json(Person.format(updatedPerson))
    })
    .catch(() => {
      res.status(400).send({ error: 'malformatted id' })
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
