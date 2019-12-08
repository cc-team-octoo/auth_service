const express = require('express')
const app = express()

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://cc-team-octoo:kJHJ8%21iJJhj@cluster0-fxhbq.azure.mongodb.net/test?retryWrites=true&w=majority')
                
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.get('/', (req, res) => res.send('Hello World!'))


//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`auth_service app listening on port ${port}...`))






