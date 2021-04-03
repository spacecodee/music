const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("private/main");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local.login", {
    successRedirect: "/login",
    failureRedirect: "/",
    failureFlash: true,
  })(req, res, next);
});

module.exports = router;
