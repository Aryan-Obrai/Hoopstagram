const express = require("express");
const cors = require("cors");

app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//GET Methods
app.get("/feed", (req, res) => {});

app.get("/games", (req, res) => {});

app.get("/teams+players", (req, res) => {});

//POST Methods
app.post("/post", (req, res) => {});

app.post("/signup", (req, res) => {
  console.log("SIGNUP");
  console.log(req.body);
  res.status(201).json({ success: true, redirectURL: "/feed" });
});

app.post("/login", (req, res) => {
  console.log("LOGIN");
  console.log(req.body);
  res.status(201).json({ success: true, redirectURL: "/feed" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
