const express = require("express");

const router = express.Router();

//GET Methods
router.get("/account_info", (req, res) => {
  if (req.user) {
    //dont send password
    let formattedUser = {
      username: req.user[0].username,
      email: req.user[0].email,
      _id: req.user[0]._id,
      favoriteTeams: req.user[0].favoriteTeams,
    };

    res.status(200).send({ user: formattedUser });
  } else {
    res.sendStatus(204);
  }
});

router.get("/feed", (req, res) => {
  if (req.user) {
    res.send({ msg: "LOGGED IN" });
  } else {
    res.send({ msg: "NOT LOGGED IN" });
  }
});

router.get("/games", (req, res) => {});

router.get("/teams_players", (req, res) => {});

//POST Methods
router.post("/post", (req, res) => {});

module.exports = router;
