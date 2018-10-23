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

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  }
]

app.get('/api/persons', (req, res) => {
  Person
    .find({}, {__v: 0})
    .then(people => {
      res.json(people.map(Person.format))
    })
    .catch(error => {
      console.log(error)
    })
})

app.get('/info', (req, res) => {
  const page =  `
  <p>
    Puhelinluettelossa on ${persons.length} henkilön tiedot
  </p>
  <p>
    ${Date()}
  </p>`
  res.send(page)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === undefined) {
    return res.status(400).json({ error: 'Missing field: name' })
  }
  if (body.number === undefined) {
    return res.status(400).json({ error: 'Missing field: number' })
  }
  // if (persons.find(person => person.name === body.name)) {
  //   return res.status(400).json({ error: 'Name must be unique' })
  // }

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
})


const generateId = () => {
  return Math.floor(Math.random() * Math.floor(2**32));
}

const formatPerson = (person) => {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
