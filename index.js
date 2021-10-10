const express = require("express");
var cors = require('cors')
const app = express();
app.use(cors())


app.use(express.json());

const db = require("./models");
require('dotenv').config();

const studentRouter = require("./routes/students");
const staffRouter = require("./routes/staff");



app.use("/users", studentRouter);
app.use("/staff", staffRouter);




db.sequelize.sync().then(() => {
    app.listen(3001, () => {
      console.log("Server running on port 3001");
    });
  });
