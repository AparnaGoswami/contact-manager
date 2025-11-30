const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");


const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "aparna", 
  database: "contact_manager",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

app.get("/contacts", (req, res) => {
  const { sortBy = "name", order = "asc", page = 1, limit = 5 } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);

  const validColumns = ["name", "email", "phone"];
  const validOrders = ["asc", "desc"];

  if (!validColumns.includes(sortBy) || !validOrders.includes(order)) {
    return res.status(400).json({ error: "Invalid sort parameters" });
  }

  const query = `SELECT * FROM contacts ORDER BY ${sortBy} ${order.toUpperCase()} LIMIT ? OFFSET ?`;
  db.query(query, [parseInt(limit), offset], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});


app.post("/contacts", (req, res) => {
  const { name, email, phone, address, category } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: "Name, Email, and Phone are required" });
  }

  db.query(
    "INSERT INTO contacts (name, email, phone, address, category) VALUES (?, ?, ?, ?, ?)",
    [name, email, phone, address, category],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
      res.sendStatus(201);
    }
  );
});

app.put("/contacts/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, category } = req.body;

  db.query(
    "UPDATE contacts SET name = ?, email = ?, phone = ?, address = ?, category = ? WHERE id = ?",
    [name, email, phone, address, category, id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
      res.sendStatus(200);
    }
  );
});

app.delete("/contacts/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM contacts WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

app.get("/search", (req, res) => {
  const searchTerm = req.query.q;
  if (!searchTerm) return res.status(400).json({ error: "Missing search term" });

  db.query(
    "SELECT * FROM contacts WHERE name LIKE ?",
    [`%${searchTerm}%`],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(result);
    }
  );
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});