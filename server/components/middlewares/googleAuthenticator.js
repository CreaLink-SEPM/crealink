const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    // user: process.env.EMAIL_USER,
    // pass: process.env.EMAIL_PASSWORD,
    user: "kiaitosantori@gmail.com",
    pass: "fshj cdgp iilj kvxg",
  },
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/api/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      // Send email after successful authentication
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: profile.email,
        subject: "Successful Login Notification",
        text: "You have successfully logged in through Google authentication.",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });

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
