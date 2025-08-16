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
        if (err) {
          console.log("[❌] Error querying colleges", err);
        }
        console.log("[🚀] Colleges Data", results);
        res.send(results);
      }
    );
  });
  res.send(result);
});

// create college
router.post("/create", async (req, res) => {
  console.log("[🚀] College Data", req.body);
  const collegeName = req.body.name;
  const collegeAddress = req.body.address;

  // validation before create
  if (!collegeName && !collegeAddress) {
    return res.status(400).send({ data: "Name and address are required" });
  }

  // async-await with promise approach
  const result = await new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO colleges (name, address) VALUES ('${collegeName}', '${collegeAddress}')`,
      (err, data) => {
        if (err) {
          console.log("[❌] Error creating college", err);
          reject(`Something went wrong`, err.message);
        } else {
          console.log("[🚀] College created successfully", data);
          resolve(
            `${data.affectedRows} row(s) created with id ${data.insertId}`
          );
        }
      }
    );
  });
  // send response with message and data
  res.send({ message: result, data: req.body });
});

// update college
router.put("/update/:id", async (req, res) => {
  const collegeId = req.params.id;
  const collegeName = req.body.name;
  const collegeAddress = req.body.address;

  // validation before update
  if (!collegeName || !collegeAddress) {
    return res.status(400).send({ data: "Name and address are required" });
  }
  // async-await with promise approach
  const result = await new Promise((resolve, reject) => {
    connection.query(
      `UPDATE colleges SET name='${collegeName}', address='${collegeAddress}' WHERE id=${collegeId}`,
      (err, data) => {
        if (err) {
          console.log("[❌] Error updating college", err);
          reject(`Something went wrong`, err.message);
        } else {
          console.log("[🚀] College updated successfully", data);
          resolve(`${data.affectedRows} row(s) updated with id ${collegeId}`);
        }
      }
    );
  });
  // send response with message and data
  res.send({ message: result, data: req.body });
});

// delete college
router.delete("/delete/:id", async (req, res) => {
  const collegeId = req.params.id;

  // validation before delete
  if (!collegeId) {
    return res.status(400).send({ data: "College id is required" });
  }

  // async-await with promise approach
  const result = await new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM colleges where id=${collegeId}`,
      (err, data) => {
        if (err) {
          console.log("[❌] Error deleting college", err);
          reject(`Something went wrong`, err.message);
        } else {
          console.log("[🚀] College deleted successfully", data);
          resolve(`${data.affectedRows} row(s) deleted with id ${collegeId}`);
        }
      }
    );
  });
  res.send({ data: result });
});

module.exports = router;
