const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../schemas/Users");

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.find({ _id: id });

    if (user) {
      done(null, user);
    }
  });

  passport.use(
    "login",
    new LocalStrategy(async function (username, password, done) {
      try {
        const user = await User.find({ username: username });

        //no account with specified username
        if (user.length < 1) {
          return done(null, false, { errorMsg: "Account doesn't exist!" });
        }

        const validPassword = await bcrypt.compare(password, user[0].password);

        //account found, invalid password
        if (!validPassword) {
          return done(null, "invalid password", {
            errorMsg: "Invalid password!",
          });
        }

        return done(null, user[0]);
      } catch (error) {
        console.log("Login LocalStrategy Error: " + error);
        return done(error, false);
      }
    })
  );

  passport.use(
    "signup",
    new LocalStrategy({ passReqToCallback: true }, async function (
      req,
      username,
      password,
      done
    ) {
      try {
        const usernameCheck = await User.find({ username: username });
        const emailCheck = await User.find({ email: req.body.email });

        //both username and email are taken
        if (usernameCheck.length > 0 && emailCheck.length > 0) {
          return done(null, false, {
            errorMsg: "Username and email are already taken!",
          });
        }
        //username is taken
        else if (usernameCheck.length > 0) {
          return done(null, false, {
            errorMsg: "Username is already taken!",
          });
        }
        //email s taken
        else if (emailCheck.length > 0) {
          return done(null, false, {
            errorMsg: " Email is already taken!",
          });
        }

        //input is valid
        else {
          //hash password
          let saltRounds = 10;
          const salt = await bcrypt.genSalt(saltRounds);
          const hashedPassword = await bcrypt.hash(password, salt);

          //create user and save to MongoDB
          const newUser = await User.create({
            username: username,
            email: req.body.email,
            password: hashedPassword,
          });

          return done(null, newUser);
        }
      } catch (error) {
        console.log("Signup LocalStrategy Error: " + error);
        return done(error, false);
      }
    })
  );
};
