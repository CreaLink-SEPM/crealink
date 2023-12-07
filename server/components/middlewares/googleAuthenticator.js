const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const dotenv = require("dotenv");

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/api/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const authenticate = passport.authenticate("google", {
  scope: ["email", "profile"],
});

const callback = passport.authenticate("google", {
  successRedirect: "/api/auth/protected",
  failureRedirect: "/api/auth/google/failure",
});

const logout = async (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send("Goodbye!");
};

const failure = async (req, res, next) => {
  res.send("Failed to authenticate..");
};

module.exports = {
  authenticate,
  callback,
  failure,
  logout,
};
