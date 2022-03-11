
const func = process.argv[2];

if (func === 'read') {
  const data = require('./data.json');
  const notes = data.notes;
  for (const prop in notes) {
    console.log(`${prop}: ${notes[prop]}`);
  }
}

if (func === 'create') {
  const data = require('./data.json');
  const nextId = data.nextId;
  const newNote = process.argv[3];
  const notes = data.notes;
  const newNextId = data.nextId + 1;

  notes[nextId] = newNote;
  data.nextId = newNextId;
  rewriteFile(data);
}

if (func === 'update') {
  const data = require('./data.json');
  const id = process.argv[3];
  const updatedNote = process.argv[4];
  const notes = data.notes;

  for (const prop in notes) {
    if (prop === id) {
      notes[id] = updatedNote;
      rewriteFile(data);
    }
  }
}

if (func === 'delete') {
  const data = require('./data.json');
  const id = process.argv[3];
  const notes = data.notes;

  delete notes[id];
  rewriteFile(data);
}

function rewriteFile(data) {
  const dataJSON = JSON.stringify(data, null, 2);
  const fs = require('fs');
  fs.writeFile('data.json', dataJSON, err => {
    if (err) throw err;
  });
}
