const express = require('express');
const fs = require('fs');

const path = require('path');
const landingPage = path.join(__dirname, "/public");

//`app` variable set to the value of `express()`
const app = express();
const PORT = process.env.PORT || 3000;

//middleware to serve static files from `/public`
app.use(express.static('public'));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes to serve up `index.html`  and `notes.html`
app.get('/notes', (req, res) => res.sendFile(path.join(landingPage,"notes.html"))
);

app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './db/db.json'))
);

fs.writeFileSync("")

//where app is live and working location
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);