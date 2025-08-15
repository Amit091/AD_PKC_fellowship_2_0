const express = require("express");
const router = express.Router();
// mysql connection
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost", //your own mysql host or 127.0.0.1
  user: "root", //your own mysql username
  password: "root", //your own mysql password
  database: "training", //your own mysql database name
  port: 3308, //your own mysql port
});
connection.connect((err) => {
  if (err) {
    console.log("[❌] Error connecting to MySQL", err);
  } else {
    console.log("[🚀] Connected to MySQL");
  }
});

// get all colleges
router.get("/", (req, res) => {
  connection.query("SELECT * FROM colleges", (err, results) => {
    if (err) {
      console.log("[❌] Error querying colleges", err);
    }
    console.log("[🚀] Colleges Data", results);
    res.json(results);
  });
});

// get college by id
router.get("/detail/:id", (req, res) => {
  const collegeId = req.params.id;
  connection.query(
    `SELECT * FROM colleges WHERE id = ${collegeId}`,
    (err, results) => {
      if (err) {
        console.log("[❌] Error querying colleges", err);
      }
      console.log("[🚀] Colleges Data", results);
      res.send(results);
    }
  );
});

// search college by name
router.get("/search/:name", async (req, res) => {
  const collegeName = req.params.name;
  // async-await with promise approach
  const result = await new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM colleges where name='${collegeName}'`,
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
  res.send(result);
});

// create college
router.post("/create", async (req, res) => {
  const collegeName = req.body.name;
  const collegeAddress = req.body.address;
  // async-await with promise approach
  const result = await new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO colleges (name, address) VALUES ('${collegeName}', '${collegeAddress}')`,
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
  res.send(result);
});

// update college
router.put("/update/:id", async (req, res) => {
  const collegeId = req.params.id;
  const collegeName = req.body.name;
  const collegeAddress = req.body.address;
  // async-await with promise approach
  const result = await new Promise((resolve, reject) => {
    connection.query(
      `UPDATE colleges SET name='${collegeName}', address='${collegeAddress}' WHERE id=${collegeId}`,
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
  res.send(result);
});

// delete college
router.delete("/delete/:id", async (req, res) => {
  const collegeId = req.params.id;
  // async-await with promise approach
  const result = await new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM colleges where id=${collegeId}`,
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
  res.send(result);
});

module.exports = router;
