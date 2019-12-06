const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://team-octo:IAOe7xppfCcIOmkT@cluster0-avezs.mongodb.net/test?retryWrites=true&w=majority')
                
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))






