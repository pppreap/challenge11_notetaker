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
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET Route for notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

//GET Route for the api/notes
app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './db/db.json'))
);

//POST  create request 
app.post('/api/notes', (req, res) => {
let id = db.push(req.body);
fs.writeFile('./db/db.json', JSON.stringify(db),()=> {
  res.json({...req.body,id:id})
})
});

//where app is live and working location
app.listen(PORT, () =>
  console.log(`App running at http://localhost:${PORT}`)
);