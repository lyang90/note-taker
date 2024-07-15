// Import Unique id
const  { v4: uuidv4 } = require('uuid');
//Import express
const express = require('express');
//Import fs 
const fs = require('fs');
// Import read and AppendFild for adding and rendering notes
const filePath = '../../../db/db.json';
const {readFromFile, readAndAppend} = require(filePath);
const path = require('path');

const app = express();

const PORT = process.env.port || 3001;


// This API route is a GET Route for getting the notes
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    fs.readFile(filePath).then((data) => res.json(JSON.parse(data)));
});

// This API route is a POST Route for adding new notes
app.post('/api/notes', (req, res) =>{
    console.info(`${req.method} request received for notes`);
    const {title, text} = req.body;

    // checking the body of the request
    if(req.body){

        // creating new note object
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
           
        }

        // adding to db.json file
        fs.writeFile(newNote, filePath);
        res.json('Note was added');
    }
    else{
        res.error('There was an error in adding the new note');
    }

    
})


//This is the HTML Route to get the notes html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../notes.html'))
});

// This is the HTML Route to get the index html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../index.html'))
});


app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);


