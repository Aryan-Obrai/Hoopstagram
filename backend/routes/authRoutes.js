const express = require("express");
const { signup } = require("../auth/signup");
const passport = require("passport");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
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

      return res.status(200).send({ errorMsg: "Success" });
    });
  })(req, res, next);
});

module.exports = router;
