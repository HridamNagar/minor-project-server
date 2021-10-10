const express = require("express");
const router = express.Router();
const { users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const listOfUsers = await users.findAll();
  res.json(listOfUsers);
});

router.post("/register", async (req, res) => {
  const { enroll, password } = req.body;

  const user = await users.findOne({ where: { enroll: enroll } });

  if (user) {
    res.json({ error: "enroll already exists", code: 404 });
  } else {
    bcrypt.hash(password, 10).then((hash) => {
      users.create({
        enroll: enroll,
        password: hash,
      });
    });

    res.json({ error: "success", code: 1 });
  }
});

router.post("/login", async (req, res) => {
  const { enroll, password } = req.body;

  const user = await users.findOne({ where: { enroll: enroll } });

  if (!user) {
    res.json({ error: "User Doesn't Exist" });
  } else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) res.json({ error: "Wrong enroll And Password Combination" });
      else {
        const accessToken = sign(
          { enroll: user.enroll, id: user.id },
          "namakshamak"
        );
        res.json({ accessToken });
      }
    });
  }
});

module.exports = router;
