const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth");

router.get("/login", isLoggedIn, (req, res) => {
  res.render("private/main");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local.login", {
    successRedirect: "/login",
    failureRedirect: "/",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", isLoggedIn, (req, res, next) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
