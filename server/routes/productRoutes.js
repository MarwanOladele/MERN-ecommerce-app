const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addNewProduct,
  getAllProducts,
  editProduct
} = require("../controller/productController");

router.post("/add-product", authMiddleware, addNewProduct);
router.get("/get-products", authMiddleware, getAllProducts);
router.put("/edit-product/:id", authMiddleware, editProduct);

module.exports = router;
