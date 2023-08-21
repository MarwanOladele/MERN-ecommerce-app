const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const connectDB = require("./db/connect");
const users = require("./routes/userRoutes");
const products = require("./routes/productRoutes");
const bids = require("./routes/bidRoutes");
const notifications = require("./routes/notificationRoutes");

// middleware
app.use(express.json());

// import user routes
app.use("/api/users", users);
// import product routes
app.use("/api/products", products);
// import bid routes
app.use("/api/bids", bids);
// import notifications routes
app.use("/api/notification", notifications);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Connecting to port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
