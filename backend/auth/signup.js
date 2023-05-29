const bcrypt = require("bcrypt");
const User = require("../schemas/Users");

//main function
async function signup(req, res) {
  try {
    isValidRequest(req, res);

    const { fname, lname, email, password } = req.body;
    //await checkAvailableEmail(email, req, res);

    //hash password
    let saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // const newUser = await User.create({
    //   firstName: fname,
    //   lastName: lname,
    //   email: email,
    //   password: hashedPassword,
    // });

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
function isValidRequest(req, res) {
  for (const field in req.body) {
    if (req.body[field].length == 0) {
      //make res
      throw new Error("Empty field submitted in sign up");
    }
  }
}

//checks if an email is already used in the database
async function checkAvailableEmail(email, req, res) {
  const query = await User.find({ email: email });

  if (query.length > 0) {
    req.flash("errorMessage", "Email in use already"); //dependent on flash in server.js
    res.redirect("/signup");
  }
}

module.exports = { signup };
