const bcrypt = require("bcrypt");
const User = require("../schemas/Users");

async function signup(req, res) {
  try {
    isValidRequest(req, res);

    const { username, email, password } = req.body;
    const unavailableUsername = await checkAvailableUsername(username);
    const unavailableEmail = await checkAvailableEmail(email);

    if (unavailableEmail && unavailableUsername) {
      res
        .status(422)
        .send({ errorMsg: "Username and email are already taken!" });
    } else if (unavailableEmail) {
      res.status(422).send({ errorMsg: "Email is already taken!" });
    } else if (unavailableUsername) {
      res.status(422).send({ errorMsg: "Username is already taken!" });
    } else {
      //hash password
      let saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      //create user and save to MongoDB
      const newUser = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
      });

      console.log("Signed up");

      res.status(201).send({
        success: true,
      });
    }
  } catch (error) {
    console.error("SIGNUP ERROR: " + error.message);
  }
}

//checks if name, email, or password fields are empty
function isValidRequest(req) {
  for (const field in req.body) {
    if (req.body[field].length == 0) {
      throw new Error("Empty field submitted in sign up");
    }
  }
}

//checks if a username is already used in the database
async function checkAvailableUsername(username) {
  const query = await User.find({ username: username });

  if (query.length > 0) {
    return true;
  }
  return false;
}

//checks if an email is already used in the database
async function checkAvailableEmail(email) {
  const query = await User.find({ email: email });

  if (query.length > 0) {
    return true;
  }
  return false;
}

module.exports = { signup };
