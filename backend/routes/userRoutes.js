const express = require("express");
const User = require("../schemas/Users");

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
    //no user logged in
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

router.get("/favorite_teams", async (req, res) => {
  if (req.user) {
    const user = await User.find({ username: req.user[0].username });

    res.status(200).send({ teams: user[0].favoriteTeams });
  } else {
    //no user logged in
    res.sendStatus(204);
  }
});

router.get("/games", (req, res) => {});

router.get("/teams_players", (req, res) => {});

//POST Methods

//PUT Methods
router.put("/update_info", async (req, res) => {
  if (req.user) {
    const info = req.body.info;

    res.status(200).send({ status: true });
  } else {
    res.sendStatus(404);
  }
});

router.put("/pick_teams", async (req, res) => {
  if (req.user) {
    const update = await User.findOneAndUpdate(
      { username: req.user[0].username },
      { favoriteTeams: req.body.teams },
      { new: true }
    );

    res.status(200).send({ status: true });
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
