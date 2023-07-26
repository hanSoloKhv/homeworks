const express = require("express");
const router = express.Router();
const { users: allUsers } = require("../store");

router.post("/login", (req, res) => {
  const { login, password } = req.body;
  if (login && password) {
    const userIdx = allUsers.findIndex((user) => user.mail === login);

    if (userIdx >= 0) {
      res.status(201);
      res.json(allUsers[userIdx]);
    } else {
      res.status(401);
      res.json("Auth error");
    }
  } else {
    res.status(401);
    res.json("Auth error");
  }
});

module.exports = router;
