const Product = require("../models/productModel");

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
    const products = await Product.find();
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

module.exports = { addNewProduct, getAllProducts };
