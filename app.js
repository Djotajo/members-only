const express = require("express");
const app = express();
require("dotenv").config();
const path = require("node:path");
const http = require("http");
const db = require("./db/queries");
const { neon } = require("@neondatabase/serverless");
const bcrypt = require("bcryptjs");
const sql = neon(process.env.DATABASE_URL);
const assetsPath = path.join(__dirname, "public");
const PORT = process.env.PORT || 3000;
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

require("dotenv").config();

const indexRouter = require("./routes/indexRouter");
const signupRouter = require("./routes/signupRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.get("/welcome", (req, res) => res.render("welcome"));

// Local Strategy - TOP
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const result = await db.getUser(username);
      const user = result[0];
      console.log(user);

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password_hashed !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await db.getUserById(id);
    const user = result[0];
    // const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
    //   id,
    // ]);
    // const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);
// Local Strategy - TOP

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
