const express = require("express");
const cors = require("cors");
const authRoutes = require("./auth/authRoutes");

app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//AUTH routes for signup/login
app.use("/auth", authRoutes);

//GET Methods
app.get("/feed", (req, res) => {});

app.get("/games", (req, res) => {});

app.get("/teams+players", (req, res) => {});

//POST Methods
app.post("/post", (req, res) => {});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
