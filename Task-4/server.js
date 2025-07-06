const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", (req, res) => {
  const { username, email, password, phoneCode, phone, gender } = req.body;

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password); // special character optional
  const validPhone = /^\d{10}$/.test(phone);
  const validPhoneCode = /^\+?\d{1,4}$/.test(phoneCode);
  const validGender = ["Male", "Female", "Prefer not to say"].includes(gender);

  if (!validEmail) {
    return res.send("<script>alert('Please enter a valid email address.'); window.history.back();</script>");
  }

  if (!validPassword) {
    return res.send("<script>alert('Password must contain at least 8 characters including uppercase, lowercase, and a number.'); window.history.back();</script>");
  }

  if (!validPhoneCode || !validPhone) {
    return res.send("<script>alert('Please enter a valid phone code and a 10-digit phone number.'); window.history.back();</script>");
  }

  if (!validGender) {
    return res.send("<script>alert('Please select a valid gender.'); window.history.back();</script>");
  }

  res.render("success", { username });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});