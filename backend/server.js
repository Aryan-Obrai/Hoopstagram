//-------------------Imports-------------------//
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
//-------------------END Imports-------------------//

app = express();

//-------------------Middleware-------------------//
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

require("./auth/passportConfig")(passport);
app.use(passport.initialize());
app.use(passport.session());
//-------------------END Middleware-------------------//

//-------------------Routes-------------------//
//Authentication routes for signup and login
app.use("/auth", authRoutes);
//-------------------END Routes-------------------//

//GET Methods
app.get("/feed", (req, res) => {
  if (req.user) {
    res.send({ msg: "LOGGED IN" });
  } else {
    res.send({ msg: "NOT LOGGED IN" });
  }
});

app.get("/user", (req, res) => {
  if (req.user) {
    //dont send password
    let formattedUser = {
      username: req.user[0].username,
      email: req.user[0].email,
      _id: req.user[0]._id,
      favoriteTeams: req.user[0].favoriteTeams,
    };

    res.send({ user: formattedUser });
  } else {
    res.send({ msg: "No user" });
  }
});

app.get("/games", (req, res) => {});

app.get("/teams_players", (req, res) => {});

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
