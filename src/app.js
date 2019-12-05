const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


//Connect to Database MongoDB
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://cc-team-octoo:kJHJ8!iJJhj@cluster0-fxhbq.azure.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

