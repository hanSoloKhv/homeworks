const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const app = express();
app.set("view engine", "ejs");
const errorNotFound = require("./middleware/404");

const users = [
  {
    login: "test",
    password: "test",
    id: Date.now(),
  },
];

function verify(login, password, done) {
  if (!users) {
    return done("Database error");
  }
  const user = users.find((u) => u.login === login);
  if (!user) {
    return done(null, false);
  }
  if (user.password !== password) {
    return done(null, false);
  }
  return done(null, user);
}

const options = {
  usernameField: "login",
  passwordField: "password",
};

passport.use("local", new LocalStrategy(options, verify));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  const user = users.find((u) => u.id === id);

  if (!user) {
    return cb("ERROR");
  }
  cb(null, user);
});

app.use(express.urlencoded());
app.use(session({ secret: "SECRET" }));

app.use(passport.initialize());
app.use(passport.session());

app.get("/user/login", (req, res) => {
  res.render("user/login", {
    title: "Форма входа",
  });
});

app.get(
  "/user/me",
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect("/user/login");
    }
    next();
  },
  (req, res) => {
    res.render("user/profile", {
      title: "Профиль",
      user: req.user,
    });
  }
);

app.get("/user/signup", (req, res) => {
  res.render("user/registration", {
    title: "Регистрация",
  });
});

app.post(
  "/user/login",
  passport.authenticate("local", { failureRedirect: "/user/login" }),
  (_, res) => {
    res.redirect("/user/me");
  }
);

app.post("/user/signup", (req, res) => {
  if (users.findIndex((u) => u.login === req.body.login) < 0) {
    const user = { ...req.body, id: Date.now() };

    users.push(user);
    res.render("user/profile", {
      title: "Профиль",
      user,
    });
  } else {
    res.redirect("/user/signup");
  }
});

app.post("/user/signout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/user/login");
  });
});

app.use(errorNotFound);

app.listen(3000);
