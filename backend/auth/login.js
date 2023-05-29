const bcrypt = require("bcrypt");
const User = require("../schemas/Users");

async function login(req, res) {
  try {
    isValidRequest(req, res);

    const { email, password } = req.body;
    const user = await validateUser(email, password, req, res);

    console.log(user);

    res.status(200).send(user);
  } catch (error) {
    console.error("LOGIN ERROR: " + error.message);
  }
}

//checks if email or password fields are empty
function isValidRequest(req) {
  for (const field in req.body) {
    if (req.body[field].length == 0) {
      throw new Error("Empty field submitted in login");
    }
  }
}

//checks if email exists, and if so checks if password matches
async function validateUser(email, password, req, res) {
  const query = await User.find({ email: email });

  if (query.length < 1) {
    //email doesn't exist
    res.status(422).send({ errorMsg: "Invalid email!" });
  } else {
    //email exists, now check password match
    const validPassword = await bcrypt.compare(password, query[0].password);

    if (!validPassword) {
      //wrong password
      res.status(401).send({ errorMsg: "Invalid password!" });
    } else {
      //send user data without password
      const { firstName, lastName, email } = query[0];

      const userSessionInfo = {
        firstName,
        lastName,
        email,
      };

      return userSessionInfo;
    }
  }
}

module.exports = { login };
