// Sirve para almancenar las rutas principales de la app, cómo contacto, bienvenida y mas
const express = require("express");
const router = express.Router();
const { isNotLoggedIn } = require("../lib/auth");

router.get("/", isNotLoggedIn, async (req, res) => {
  res.render("index");
});

module.exports = router;
