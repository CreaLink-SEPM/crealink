const express = require("express");
const passport = require("passport");
const router = express.Router();
const session = require("express-session");
const GoogleAuthenticator = require("../middlewares/googleAuthenticator.js");

router.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());

// Google Authenticator routes
router.get("/google", GoogleAuthenticator.authenticate);
router.get("/google/callback", GoogleAuthenticator.callback);
router.get("/google/failure", GoogleAuthenticator.failure);
router.get("/logout", GoogleAuthenticator.logout);

router.get("/", (req, res) => {
  res.send('<a href="auth/google">Authenticate with Google</a>');
});
router.get("/protected", (req, res) => {
  res.send('<a">YEAHHHHHHHHHH</a>');
});

module.exports = router;
