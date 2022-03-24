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

var errors = {
  errPostiveInt: { error: 'id must be a positive integer' },
  errCannotFind: { error: 'cannot find note with id ' },
  errRequireContent: { error: 'content is a required field' },
  noErr: 'no error'
};

function errorMsgID(id) {
  let error;
  let idIsThere;
  const idNum = parseFloat(id);
  const isInt = Number.isInteger(idNum);

  if (typeof idNum === 'number' && idNum > 0 && !isNaN(idNum)) {
    if (isInt) {
      for (const prop in notes) {
        if (parseInt(prop) === parseInt(id)) {
          idIsThere = true;
        }
      }
      if (idIsThere === true) {
        error = errors.noErr;
      } else {
        errors.errCannotFind.error = `cannot find note with id ${id}`;
        error = errors.errCannotFind;
      }
    } else {
      error = errors.errPostiveInt;
    }
  } else {
    error = errors.errPostiveInt;
  }

  return error;
}

function errorMsgContent() {
  const error = errors.errRequireContent;
  return error;
}

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const error = errorMsgID(id);

  var noteToRead;

  if (error === errors.errPostiveInt) {
    res.status(400).json(error);
  } else if (error === errors.errCannotFind) {
    res.status(404).json(error);
  } else if (error === errors.noErr) {
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
  let error;
  if (req.body.content === undefined) {
    error = errorMsgContent();
    res.status(400).json(error);
  } else {
    const newContent = req.body;
    newContent.id = nextID;
    notes[nextID] = newContent;
    nextID++;
    data.nextId = nextID;
    data.notes = notes;
    rewriteFile(data);
    res.status(201).send(newContent);
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const error = errorMsgID(id);

  if (error === errors.errPostiveInt) {
    res.status(400).json(error);
  } else if (error === errors.errCannotFind) {
    res.status(404).json(error);
  } else if (error === errors.noErr) {
    for (const prop in notes) {
      if (prop === id) {
        delete notes[id];
      }
    }
    data.notes = notes;
    rewriteFile(data);
    res.status(204).send();
  }
});

app.put('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  let error = errorMsgID(id);
  let newContent;

  if (error === errors.errPostiveInt) {
    res.status(400).json(error);
  } else if (error === errors.errCannotFind) {
    res.status(404).json(error);
  } else if (error === errors.noErr) {
    if (req.body.content === undefined) {
      error = errorMsgContent();
      res.status(400).json(error);
    } else {
      newContent = req.body.content;

      for (const prop in notes) {
        if (prop === id) {
          notes[prop].content = newContent;
          var successMsg = notes[prop];
        }
      }
      data.notes = notes;
      rewriteFile(data);
      res.status(200).json(successMsg);
    }
  }
});

rewriteFile(data);
function rewriteFile(data) {
  const dataJSON = JSON.stringify(data, null, 2);
  const fs = require('fs');
  fs.writeFile('data.json', dataJSON, err => {
    if (err) throw err;
  });
}

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000!');
});
