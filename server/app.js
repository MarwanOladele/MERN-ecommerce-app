const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const connectDB = require("./db/connect");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Connecting to port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
