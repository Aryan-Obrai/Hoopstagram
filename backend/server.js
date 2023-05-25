const express = require("express");
const cors = require("cors");

app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//GET Methods
app.get("/feed", (req, res) => {});

app.get("/signup", (req, res) => {});

app.get("/login", (req, res) => {});

app.get("/games", (req, res) => {});

app.get("/teams+players", (req, res) => {});

//POST Methods
app.post("/post", (req, res) => {});

app.post("/signup", (req, res) => {
  console.log("POSTED");
  console.log(req.body);
  res.status(201).send("yes");
});

app.post("/login", (req, res) => {});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
