const express = require('express');
const fs = require('fs');
const path = require('path')

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html')); 
  });

  app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/db/db.json")); 
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
  });

  app.post("/api/notes", (req, res) => {
    let createdNote = req.body;
    let currentNotes = JSON.parse(fs.readFileSync(".Develop/db/db.json", "utf8"));
    let notelength = (currentNotes.length).toString();


//create a property called id based on length and assign it to each json object

createdNote.id = notelength;

currentNotes.push(createdNote);

//write the updated data to db.json

fs.fileWriteSync(".Develop/db/db.json", JSON.stringify(currentNotes));
res.json(currentNotes);
  })

//delete note according to tagged id

//filter all notes that does not have matching id and saved them as a new array

//write the updated data to db.json and display the updated note

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
  