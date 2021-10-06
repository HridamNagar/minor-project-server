const express = require("express");
var cors = require('cors')
const app = express();
app.use(cors())


app.use(express.json());

const db = require("./models");
require('dotenv').config();

const userRouter = require("./routes/users");
const artistRouter = require("./routes/artists");
const eventRouter = require("./routes/events");


app.use("/users", userRouter);
app.use("/artists", artistRouter);
app.use("/events", eventRouter);




db.sequelize.sync().then(() => {
    app.listen(3001, () => {
      console.log("Server running on port 3001");
    });
  });