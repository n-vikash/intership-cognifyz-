const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index");
});
app.post("/submit", (req, res) => {
  const { name, email, phone, gender, message } = req.body;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validPhone = /^\d{10}$/.test(phone);
  const validMessage = message.trim().length >= 2;
  if (!validEmail || !validPhone || !message) {
    return res.redirect("/"); // fallback if bypassed client-side
  }
  res.send(`
    <div style="text-align: center; font-family: sans-serif; margin-top: 50px;">
      <h1>✅ Thank you for visiting us, ${name}!</h1>
      <p>We received your submission:</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Gender:</b> ${gender}</p>
      <blockquote style="color: gray;">${message}</blockquote>
      <a href="/" style="margin-top: 20px; display: inline-block;">Submit Another</a>
    </div>
  `);
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
