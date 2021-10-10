const express = require("express");
const router = express.Router();
const { students } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const listOfStudents = await students.findAll();
  res.json(listOfStudents);
});

router.post("/register", async (req, res) => {
  const { enroll, password } = req.body;

  const student = await students.findOne({ where: { enroll: enroll } });

  if (student) {
    res.json({ error: "enroll already exists", code: 404 });
  } else {
    bcrypt.hash(password, 10).then((hash) => {
      students.create({
        enroll: enroll,
        password: hash,
      });
    });

    res.json({ error: "success", code: 1 });
  }
});

router.post("/login", async (req, res) => {
  const { enroll, password } = req.body;

  const student = await students.findOne({ where: { enroll: enroll } });

  if (!student) {
    res.json({ error: "student Doesn't Exist" });
  } else {
    bcrypt.compare(password, student.password).then((match) => {
      if (!match) res.json({ error: "Wrong enroll And Password Combination" });
      else {
        const accessToken = sign(
          { enroll: student.enroll, id: student.id },
          "namakshamak"
        );
        res.json({ accessToken });
      }
    });
  }
});

module.exports = router;
