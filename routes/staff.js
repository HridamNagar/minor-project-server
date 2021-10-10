const express = require("express");
const router = express.Router();
const { staff } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const listOfStaff = await staff.findAll();
  res.json(listOfStaff);
});

router.post("/register", async (req, res) => {
  const { enroll, password, accessCode } = req.body;

  const staff = await staff.findOne({ where: { enroll: enroll } });

  if (staff) {
    res.json({ error: "enroll already exists", code: 404 });
  } else if (accessCode != "12345") {
    res.json({ error: "Invalid access code", code: 401 });
  } else {
    bcrypt.hash(password, 10).then((hash) => {
      staff.create({
        enroll: enroll,
        password: hash,
      });
    });

    res.json({ error: "success", code: 1 });
  }
});

router.post("/login", async (req, res) => {
  const { enroll, password } = req.body;

  const staff = await staff.findOne({ where: { enroll: enroll } });

  if (!staff) {
    res.json({ error: "staff Doesn't Exist" });
  } else {
    bcrypt.compare(password, staff.password).then((match) => {
      if (!match) res.json({ error: "Wrong enroll And Password Combination" });
      else {
        const accessToken = sign(
          { enroll: staff.enroll, id: staff.id },
          "namakshamak"
        );
        res.json({ accessToken });
      }
    });
  }
});

module.exports = router;
