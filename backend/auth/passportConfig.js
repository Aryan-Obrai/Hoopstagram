const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const User = require("../schemas/Users");

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
      console.log(user);
      done(err, user);
    });
  });

  passport.use(
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

        let userFormatted = user[0];
        //remove password
        userFormatted.password = undefined;

        return done(null, userFormatted);
      } catch (error) {
        console.log("LocalStrategy Error: " + error);
        return done(error, false);
      }
    })
  );
};
