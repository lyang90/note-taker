// Import Unique id
const  { v4: uuidv4 } = require('uuid');

//Import express
const notes = require('express').Router();

//Import fs 
const fs = require('fs');
// Import read and append file for adding and rendering notes
const filePath = './db/db.json';

// List of notes
let newNotes = [];
 
fs.readFile(filePath, (err, data) =>{
    if (err) throw err;
    console.log("Starting notes: ", JSON.parse(data));
    newNotes = JSON.parse(data) || [];
});

// This API route is a GET Route for getting the notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for api/notes`);
    fs.readFile(filePath, (err, data) =>{
        if (err) throw err;
        console.log(JSON.parse(data));
        res.json(JSON.parse(data));
    });
});


// This API route is a POST Route for adding new notes
notes.post('/', (req, res) =>{
    console.info(`${req.method} request received for api/notes`);
    console.log(req.body);
    const {title, text} = req.body;
    console.log("Creating notes with values: ", title, text);
    
    // checking the body of the request
    if(req.body){

        // creating new note object
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }

        newNotes.push(newNote);

        // adding to db.json file
        fs.writeFile(filePath, JSON.stringify(newNotes), err => {
            if(err){
                console.error(err);
            }
            else{
                console.log('Written notes to the file.');
            }
        });
        res.json('Note was added');
    }
    else{
        res.json('Error in adding note.');
    }

    
});

module.exports = notes;