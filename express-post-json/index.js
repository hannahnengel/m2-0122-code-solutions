const express = require('express');
const grades = {};
const app = express();

app.get('/api/grades', (req, res) => {
  const gradesArray = [];
  for (const grade in grades) {
    gradesArray.push(grades[grade]);
  }
  res.json(gradesArray);
});

app.use(express.json());

var nextID = 1;
app.post('/api/grades', (req, res) => {
  const newGrade = req.body;
  newGrade.id = nextID;
  grades[nextID] = newGrade;
  nextID++;

  res.status(201).send(newGrade);
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000!');
});
