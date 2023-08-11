const Product = require("../models/productModel");
const cloudinary = require("../cloudinary/config");

// add new product
const addNewProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.send({
      sucess: true,
      message: "Product added successfully",
    });
  } catch (error) {
    res.send({
      sucess: false,
      message: error.message,
    });
  }
};

// get all products
const getAllProducts = async (req, res) => {
  try {
    const { seller, categories = [], age = [] } = req.body;
    let filters = {};
    if (seller) {
      filters.seller = seller;
    }
    const products = await Product.find(filters)
      .populate("seller")
      .sort({ createdAt: -1 });
    res.send({
      sucess: true,
      message: products,
    });
  } catch (error) {
    res.send({
      sucess: false,
      message: error.message,
    });
  }
};

// edit product
const editProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      sucess: true,
      message: "product updated successfully",
    });
  } catch (error) {
    res.send({
      sucess: false,
      message: error.message,
    });
  }
};

// delete product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({
      sucess: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    res.send({
      sucess: false,
      message: error.message,
    });
  }
};

//handle image upload to cloudinary
const imageUpload = async (req, res) => {
  try {
    //upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "marwanMP",
    });

    const productId = req.body.productId;
    await Product.findByIdAndUpdate(productId, {
      $push: { images: result.secure_url },
    });
    res.send({
      sucess: true,
      message: "image uploaded successfully",
      data: result.secure_url,
    });
  } catch (error) {
    res.send({
      sucess: false,
      message: error.message,
    });
  }
};

// update product status
const updateProductStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { status });
    res.send({
      sucess: true,
      message: "product status successfully",
    });
  } catch (error) {
    res.send({
      sucess: false,
      message: error.message,
    });
  }
}; 

module.exports = {
  addNewProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
  imageUpload,
  updateProductStatus,
};
