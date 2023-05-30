const bcrypt = require("bcrypt");
const User = require("../schemas/Users");

async function signup(req, res) {
  try {
    isValidRequest(req, res);

    const { username, email, password } = req.body;
    await checkAvailableEmail(email, res);

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

    // res.status(201).json({
    //   success: true,
    //   redirectURL: "/feed",
    // });
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

//checks if an email is already used in the database
async function checkAvailableEmail(email, res) {
  const query = await User.find({ email: email });

  if (query.length > 0) {
    res.status(422).send({ errorMsg: "That email is taken!" });
    throw new Error("User already exists");
  }
}

module.exports = { signup };
