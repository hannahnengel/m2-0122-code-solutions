const express = require('express');
const app = express();

const pg = require('pg');
const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/api/grades', (req, res) => {
  const sql = `
  select *
    from "grades"
  `;
  db.query(sql)
    .then(result => {
      const grades = result.rows;
      res.json(grades);
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.use(express.json());

app.post('/api/grades', (req, res) => {
  const score = Number(req.body.score);
  const params = [req.body.name, req.body.course, req.body.score];
  if (req.body.name === undefined || req.body.course === undefined || req.body.score === undefined) {
    res.status(400).json({
      error: 'Invalid grade. Name, course, and score are required fields.'
    });
    return;
  }
  if (!Number.isInteger(score) || score < 0 || score > 100) {
    res.status(400).json({
      error: 'Invalid grade. Score must be an integer between 0 and 100.'
    });
    return;
  }
  const sql = `
  insert into "grades" ("name", "course", "score")
  values ($1, $2, $3)
  returning *
  `;

  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.put('/api/grades/:gradeId', (req, res) => {
  const gradeId = Number(req.params.gradeId);
  const score = Number(req.body.score);
  const params = [req.params.gradeId, req.body.name, req.body.course, req.body.score];
  if (!Number.isInteger(gradeId) || gradeId < 0) {
    res.status(400).json({
      error: 'Invalid grade. GradeId must be a positive integer.'
    });
    return;
  }
  if (req.params.gradeId === undefined || req.body.name === undefined || req.body.course === undefined || req.body.score === undefined) {
    res.status(400).json({
      error: 'Invalid grade. GradeId, name, course, and score are required fields.'
    });
    return;
  }
  if (!Number.isInteger(score) || score < 0 || score > 100) {
    res.status(400).json({
      error: 'Invalid grade. Score must be an integer between 0 and 100.'
    });
    return;
  }

  const sql = `
  update "grades"
      set "name" = $2,
          "course" = $3,
          "score" = $4
    where "gradeId" = $1
    returning *
  `;

  db.query(sql, params)
    .then(result => {
      const grade = result.rows[0];
      if (!grade) {
        res.status(404).json({
          error: `Cannot find grade with gradeId ${gradeId}`
        });
      } else {
        res.json(result.rows[0]);
      }
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.delete('/api/grades/:gradeId', (req, res) => {
  const gradeId = Number(req.params.gradeId);
  const params = [req.params.gradeId];
  if (!Number.isInteger(gradeId)) {
    res.status(400).json({
      error: 'Invalid grade. GradeId must be a valid integer.'
    });
    return;
  }

  const sql = `
  delete from "grades"
    where "gradeId" = $1
    returning *
  `;

  db.query(sql, params)
    .then(result => {
      const deleted = result.rows[0];
      if (!deleted) {
        res.status(404).json({
          error: `Cannot find grade with gradeId ${gradeId}`
        });
      } else {
        res.sendStatus(204);
      }
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express server listening on port 3000');
});
