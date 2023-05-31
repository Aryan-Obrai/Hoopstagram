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

      console.log("Signed up as " + req.body.username);
      console.log("SESSION STARTED");

      return res.status(200).send({ errorMsg: "Success" });
    });
  })(req, res, next);
});

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

      console.log("Logged in as " + req.body.username);
      console.log("SESSION STARTED");

      return res.status(200).send({ errorMsg: "Success" });
    });
  })(req, res, next);
});

module.exports = router;
