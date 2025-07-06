const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// ✅ MongoDB connection (replace <password> and cluster URL)
mongoose.connect("mongodb+srv://sumbission-v:submit12@submit.cz3otzz.mongodb.net/?retryWrites=true&w=majority&appName=submit")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Mongoose Schema
const UserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  gender: String
});

const User = mongoose.model("User", UserSchema);

// ✅ POST /register - Save user
app.post("/register", async (req, res) => {
  const { fullName, email, phone, gender } = req.body;

  if (!fullName || !email || !phone || !gender) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const newUser = new User({ fullName, email, phone, gender });
    await newUser.save();
    res.status(201).json({ message: "User saved", fullName, email, phone, gender });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Serve success.html
app.get("/success.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "success.html"));
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
