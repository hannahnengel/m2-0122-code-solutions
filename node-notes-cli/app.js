
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

  notes[nextId] = newNote;
  rewriteFile(data);
}

if (func === 'update') {
  const data = require('./data.json');
  const id = process.argv[3];
  const updatedNote = process.argv[4];
  const notes = data.notes;

  notes[id] = updatedNote;
  rewriteFile(data);
}

if (func === 'delete') {
  const data = require('./data.json');
  const id = process.argv[3];
  const notes = data.notes;

  delete notes[id];
  rewriteFile(data);
}

const data = require('./data.json');
var nextId = data.nextId;
for (const prop in data.notes) {
  nextId = parseInt(prop) + 1;
}
data.nextId = nextId;
rewriteFile(data);

function rewriteFile(data) {
  const dataJSON = JSON.stringify(data, null, 2);
  const fs = require('fs');
  fs.writeFile('data.json', dataJSON, err => {
    if (err) throw err;
  });
}
