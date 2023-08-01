const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addNewProduct,
  getAllProducts,
} = require("../controller/productController");

router.post("/add-product", authMiddleware, addNewProduct);
router.get("/get-products", getAllProducts);

module.exports = router;
