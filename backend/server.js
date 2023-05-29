require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./auth/authRoutes");

app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Authentication routes
app.use("/auth", authRoutes);

//GET Methods
app.get("/feed", (req, res) => {});

app.get("/games", (req, res) => {});

app.get("/teams+players", (req, res) => {});

//POST Methods
app.post("/post", (req, res) => {});

//host app and then connect to MongoDB
app.listen(5000, () => {
  console.log("Server running on port 5000");

  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Connected to MongoDB"))
    .catch((error) => {
      console.log("DB CONNECTION ERROR: " + error);
    });
});
