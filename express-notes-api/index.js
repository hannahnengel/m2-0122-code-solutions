const express = require('express');
const app = express();

const data = require('./data.json');
var nextID = data.nextId;
var notes = data.notes;

app.get('/api/notes', (req, res) => {
  const dataArray = [];
  for (const prop in notes) {
    dataArray.push(notes[prop]);
  }
  res.json(dataArray);
});

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const isInt = Number.isInteger(parseInt(id));
  let idIsThere = false;
  var noteToRead;

  const errPostiveInt = {
    error: 'id must be a positive integer'
  };
  const errCannotFind = {
    error: `cannot find note with id ${id}`
  };

  for (const prop in notes) {
    if (parseInt(prop) === parseInt(id)) {
      idIsThere = true;
    }
  }

  if ((isInt === false) || parseInt(id) < 0) {
    res.status(400).json(errPostiveInt);
  } else if (isInt === true && parseInt(id) > 0 && (idIsThere === false)) {
    res.status(404).json(errCannotFind);
  } else if (isInt === true && parseInt(id) > 0 && idIsThere === true) {
    for (const prop in notes) {
      if (prop === id) {
        noteToRead = notes[prop];
      }
    }
    res.status(200).json(noteToRead);
  }
});

app.use(express.json());

app.post('/api/notes', (req, res) => {
  const errRequireContent = {
    error: 'content is a required field'
  };
  if (req.body.content === undefined) {
    res.status(400).json(errRequireContent);
  } else {
    const newContent = req.body;
    newContent.id = nextID;
    notes[nextID] = newContent;
    nextID++;
    res.status(201).send(newContent);
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const isInt = Number.isInteger(parseInt(id));
  let idIsThere = false;

  const errPostiveInt = {
    error: 'id must be a positive integer'
  };
  const errCannotFind = {
    error: `cannot find note with id ${id}`
  };

  for (const prop in notes) {
    if (parseInt(prop) === parseInt(id)) {
      idIsThere = true;
    }
  }

  if ((isInt === false) || parseInt(id) < 0) {
    res.status(400).json(errPostiveInt);
  } else if (isInt === true && parseInt(id) > 0 && (idIsThere === false)) {
    res.status(404).json(errCannotFind);
  } else if (isInt === true && parseInt(id) > 0 && idIsThere === true) {
    for (const prop in notes) {
      if (prop === id) {
        delete notes[prop];
      }
    }
    res.status(204).send();
  }
});

app.put('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const isInt = Number.isInteger(parseInt(id));
  let idIsThere = false;
  let newContent;

  const errPostiveInt = {
    error: 'id must be a positive integer'
  };
  const errCannotFind = {
    error: `cannot find note with id ${id}`
  };
  const errRequireContent = {
    error: 'content is a required field'
  };

  for (const prop in notes) {
    if (parseInt(prop) === parseInt(id)) {
      idIsThere = true;
    }
  }

  if ((isInt === false) || parseInt(id) < 0) {
    res.status(400).json(errPostiveInt);
  } else if ((isInt === true && parseInt(id) > 0 && (idIsThere === false))) {
    res.status(404).json(errCannotFind);
  } else if (req.body.content === undefined) {
    res.status(400).json(errRequireContent);
  } else if (isInt === true && parseInt(id) > 0 && idIsThere === true && req.body.content !== undefined) {
    newContent = req.body.content;

    for (const prop in notes) {
      if (prop === id) {
        notes[prop].content = newContent;
        var successMsg = notes[prop];
      }
    }
    res.status(200).json(successMsg);
  }
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000!');
});
