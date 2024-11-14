const mongoose = require("mongoose");

const dbConnection = process.env.CONNECTION_STRING;

mongoose
  .connect(dbConnection)
  .then((res) => {
    console.log("MongoDB  Atlas connected successfully with PfServer");
  })
  .catch((err) => {
    console.log("Connection Failed");
    console.log(err);
  });
