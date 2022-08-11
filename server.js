//required dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

//`app` variable set to the value of `express()`
const app = express();
const PORT = process.env.PORT || 3000;

//middleware to serve static files from `/public`
app.use(express.static('public'));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes for the api data index.html notes.html
// GET Route for homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET Route for notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

//GET Route for the api/notes
app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './db/db.json'));
});

//GET Route for api/notes/:id (saved notes)
app.get('/api/notes/:id', (req, res) => {
let saveNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
res.json(saveNotes[Number(req.params.id)]);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//POST  create request note
app.post('/api/notes', (req, res) => {
let saveNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  //deconstructuring object 
let newNotes = req.body;
let notesID = (saveNotes.length).toString();
newNotes.id = notesID;
saveNotes.push(newNotes);

//update db.json file with notes inputted tp db
fs.writeFileSync('./db/db.json', JSON.stringify(saveNotes));
  res.json(saveNotes);
});

//DELETE request for note function
app.delete('/api/notes/:id', (req, res)=>{
  let saveNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  let noteID = req.params.id;
  let startNote = 0;
  saveNotes = saveNotes.filter(currentNote => {
    return currentNote.id != noteID;
  })

  //filter through notes used
for (currentNote of saveNotes) {
  currentNote.id = startNote.toString();
}
//update db.json file tp delete note
fs.writeFileSync('./db/db.json', JSON.stringify(saveNotes));
  res.json(saveNotes);
})


//where app is live and working location
app.listen(PORT, () =>
  console.log(`App running at http://localhost:${PORT}`)
);