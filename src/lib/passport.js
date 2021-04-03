const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { pool } = require("../database");

passport.use(
  "local.login",
  new LocalStrategy(
    {
      usernameField: "user",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const rows = await pool.query("SELECT * FROM users WHERE username = ?", [
        username,
      ]);
      if (rows.length > 0) {
        const user = rows[0];
        if (user.password === password) {
          done(null, user, req.flash("success", `Bienvwnido ${user.username}`));
        } else {
          done(null, false, req.flash("message", `Contraseña invalidad`));
        }
      } else {
        return done(null, false, req.flash("message", `Usuario no existe`));
      }
    }
  )
);

passport.serializeUser((usr, done) => {
  console.log(usr);
  done(null, usr.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  done(null, rows[0]);
});
