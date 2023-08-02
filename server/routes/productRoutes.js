const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addNewProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
} = require("../controller/productController");

router.post("/add-product", authMiddleware, addNewProduct);
router.get("/get-products", authMiddleware, getAllProducts);
router.put("/edit-product/:id", authMiddleware, editProduct);
router.delete("/delete-product/:id", authMiddleware, deleteProduct);

module.exports = router;
