const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const submissions = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { error: null });
});

app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validMessage = message.length >= 2;

  if (!validEmail || !validMessage) {
    return res.render("index", { error: "Invalid input. Please try again." });
  }

  submissions.push({ name, email, message });

  res.send(
    "<div style='text-align: center; font-family: sans-serif; margin-top: 50px;'>" +
      "<h1>✅ Thank you for visiting us, " + name + "!</h1>" +
      "<p>We received your submission:</p>" +
      "<p><b>Email:</b> " + email + "</p>" +
      "<blockquote style='color: gray;'>" + message + "</blockquote>" +
      "<a href='/' style='margin-top: 20px; display: inline-block;'>Submit Another</a>" +
    "</div>"
  );
});

app.listen(port, () => {
  console.log("Server running at http://localhost:" + port);
});
