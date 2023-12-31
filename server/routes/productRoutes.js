const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addNewProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
  imageUpload,
  updateProductStatus,
  getProductByID
} = require("../controller/productController");
const multer = require("multer");

router.post("/add-product", authMiddleware, addNewProduct);
router.post("/get-products", authMiddleware, getAllProducts);
router.put("/edit-product/:id", authMiddleware, editProduct);
router.delete("/delete-product/:id", authMiddleware, deleteProduct);
router.put("/update-product-status/:id", authMiddleware, updateProductStatus);
router.get("/get-product-by-id/:id", authMiddleware, getProductByID);

// get image from pc
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
router.post(
  "/upload-image-to-product",
  authMiddleware,
  multer({ storage: storage }).single("file"),
  imageUpload
);

module.exports = router;
