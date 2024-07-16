
//Import express
const express = require('express');

const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

const api = require('./routes');

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/notes', api);

app.use(express.static('public'));

//This is the HTML Route to get the notes html file
app.get('/notes', (req, res) => {
    console.info(`${req.method} request received for /notes`);
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// This is the HTML Route to get the index html file
app.get('*', (req, res) => {
    console.info(`${req.method} request received for *`);
    res.sendFile(path.join(__dirname, './public/index.html'))
});


app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);


