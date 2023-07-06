const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const connectDB = require("./db/connect");
const users = require("./routes/userRoutes");

// middleware
app.use(express.json());

// import task routes
app.use("/api/users", users);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Connecting to port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
