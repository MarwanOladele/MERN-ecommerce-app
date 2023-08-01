const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const connectDB = require("./db/connect");
const users = require("./routes/userRoutes");
const products = require('./routes/productRoutes')

// middleware
app.use(express.json());

// import user routes
app.use("/api/users", users);
// import product routes
app.use("/api/products", products);


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Connecting to port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
