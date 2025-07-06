const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
let users = []; // In-memory user store
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: uuidv4(), name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});
app.get("/users", (req, res) => {
  res.json(users);
});
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = users.find((u) => u.id === id);
  if (user) {
    user.name = name;
    user.email = email;
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((u) => u.id !== id);
  res.json({ message: "User deleted" });
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});