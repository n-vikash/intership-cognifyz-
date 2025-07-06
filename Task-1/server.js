const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;
  res.send(`
    <h1 style="text-align:center">Thanks for visiting us, ${name}!</h1>
    <p style="text-align:center">We'll contact you at: <b>${email}</b></p>
    <div style="text-align:center;"><a href="/">Sumbit another</a></div>
<p style="text-align:center">Your message: <strong>${message}</strong></p>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
