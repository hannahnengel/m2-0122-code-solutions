const express = require('express');
const grades = {};
const app = express();

var gradesArray = [];
app.get('/api/grades', (req, res) => {
  for (const grade in grades) {
    gradesArray.push(grades[grade]);
  }
  res.json(gradesArray);
});

app.use(express.json());

var nextID = 1;
app.post('/api/grades', (req, res) => {

  req.body.id = nextID;
  gradesArray.push(req.body);
  nextID++;

  res.status(201).send(req.body);
  res.status(201).end();
  res.status(201).send('Created');
  res.status(201).sendFile('/api/grades');
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000!');
});
