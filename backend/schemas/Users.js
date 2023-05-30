const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: 2,
  },
  googleID: {
    type: String,
  },
  favoriteTeams: [{ type: String }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
