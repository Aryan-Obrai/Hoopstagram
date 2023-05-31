const express = require("express");
const passport = require("passport");

const router = express.Router();

//Middleware function
//Makes sure form is not empty upon submission
const isValidRequest = (req, res, next) => {
  let valid = true;
  for (const field in req.body) {
    if (req.body[field].length == 0) {
      valid = false;
      break;
    }
  }

  if (valid) {
    next();
  } else {
    res.status(422).send({ errorMsg: "Empty form submitted" });
  }
};

//signup and login use Passport.js Middleware to authenticate
//located in auth/passportConfig.js

//session is created on signup so user doesn't have to re login
router.post("/signup", isValidRequest, (req, res, next) => {
  passport.authenticate("signup", (error, user, info) => {
    if (error) {
      console.log("SignupPassportAuthenticate Error: " + error);
      return res.status(500).send("Server error");
    }

    //user was not able to sign up
    if (!user) {
      return res.status(422).send({ errorMsg: info.errorMsg });
    }

    req.login(user, (error) => {
      if (error) {
        return next(error);
      }

      console.log("Signed up as " + user.username);
      console.log("SESSION STARTED");

      let formattedUser = {
        username: user.username,
        email: user.email,
        _id: user._id,
      };

      return res.status(201).send({ user: formattedUser });
    });
  })(req, res, next);
});

//session is created on login
router.post("/login", isValidRequest, (req, res, next) => {
  passport.authenticate("login", (error, user, info) => {
    if (error) {
      console.log("LoginPassportAuthenticate Error: " + error);
      return res.status(500).send("Server error");
    }

    //user doesn't exist
    if (!user) {
      return res.status(422).send({ errorMsg: info.errorMsg });
    }

    //invalid password
    if (user === "invalid password") {
      return res.status(401).send({ errorMsg: info.errorMsg });
    }

    req.login(user, (error) => {
      if (error) {
        return next(error);
      }

      console.log("Logged in as " + user.username);
      console.log("SESSION STARTED");

      let formattedUser = {
        username: user.username,
        email: user.email,
        _id: user._id,
      };

      return res.status(200).send({ user: formattedUser });
    });
  })(req, res, next);
});

module.exports = router;
