const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars"); // es un modulo de vistas cómo en react el jsx o java jsp
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MySQLStore = require("express-mysql-session");
const { database } = require("./keys");
const passport = require("passport");

//Initializations
const app = express();
require("./lib/passport");

//settings
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  })
);
app.set("view engine", ".hbs"); // empieza a usar .hbs

// Middlewares -> son funciones que se ejecutan cada vez que un usuario envia una petición al servidor
app.use(
  session({
    secret: "spacecodee",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  })
);
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); // para que pueda aceptar solo caracteres cómo letras y mas
app.use(express.json()); // para poder usar json
app.use(passport.initialize());
app.use(passport.session());

//Global Variables
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  next();
});

//Routes
app.use(require("./routes/index")); // le enviamos la ruta que este necesesite para
app.use(require("./routes/links"));
app.use(require("./routes/authentications"));

// Public
app.use(express.static(path.join(__dirname, "public")));
////app.use(express.static(path.join(__dirname, 'wiews/js')));

// Starting the server
app.listen(app.get("port"), () => {
  console.log("Server on port: ", app.get("port"));
});
