const { response } = require("express");
const express = require("express");
const fs = require("fs");
const { request } = require("http");
const mysql = require("mysql");
const { callbackify } = require("util");

const app = express();

const count = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const json = fs.readFileSync("credentials.json", "utf8");
const credentials = JSON.parse(json);

function checkDelete(p1) {
  if (p1 == 1) return true;
  return false;
}

// creates new connection using credentials and checks for errors
const connection = mysql.createConnection(credentials);
connection.connect((error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
});

// gets all players
app.get("/players", (req, res) => {
  connection.query(
    `SELECT fullName,screenName,wins,losses FROM project_2_347.players WHERE isDeleted = 0`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});

// gets player by ID
app.get("/players/:id", (req, res) => {
  connection.query(
    `SELECT fullName,screenName,wins,losses FROM project_2_347.players WHERE player_ID = ${req.params.id} AND isDeleted = 0`,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      //   if (checkDelete(req.params.isDeleted)) {
      //     console.log(
      //       "You are trying to access a deleted player profile. Please try another."
      //     );
      //   }
      res.send(results);
    }
  );
});

// post a new player
app.post("/players", (req, res) => {
  if (
    req.body.hasOwnProperty("fullName") &&
    req.body.hasOwnProperty("screenName")
  ) {
    const fullName = req.body.fullName;
    const screenName = req.body.screenName;

    connection.query(
      `INSERT INTO players (fullName,screenName,wins,losses,isDeleted) VALUES (?,?, 0, 0, 0)`,
      [fullName, screenName],
      (err, result) => {
        if (err) {
          res.json({
            ok: false,
            response: err.message,
          });
        } else {
          console.log(result);
          res.json({
            ok: true,
          });
        }
      }
    );
  } else {
    res.json({
      ok: false,
    });
  }
});

// deletes player by ID
app.delete("/players/:id", (req, res) => {
  //const parameters = [parseInt(req.params.id)];

  const query = `UPDATE players SET isDeleted = 1 WHERE player_ID = ${req.params.id}`;
  connection.query(query, (error, result) => {
    if (error) {
      res.status(404);
      res.json({
        ok: false,
        results: error.message,
      });
    } else {
      console.log(result);
      res.json({
        ok: true,
      });
    }
  });
});

// updates the player screeName based on input given ID
app.patch("/players/:id", (req, res) => {
  const parameters = [req.body.screenName];

  const que = `UPDATE players SET screenName = ? WHERE player_ID = ${req.params.id}`;

  connection.query(que, parameters, (error, result) => {
    if (error) {
      res.status(404);
      res.json({
        ok: false,
        results: error.message,
      });
    } else {
      console.log(result);
      res.json({
        ok: true,
      });
    }
  });
});

app.listen(5000, () => {
  console.log("running on post 5000!");
});

// connection.end();
