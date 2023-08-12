const Bid = require("../models/bidModel");

// place a new bid
const placeNewBid = async (req, res) => {
  try {
    const newBid = new Bid(req.body);
    await newBid.save();
    res.send({
      sucess: true,
      message: "Bid placed successfully",
    });
  } catch (error) {
    res.send({
      sucess: false,
      message: error.message,
    });
  }
};

// get all bids
const getAllbids = async (req, res) => {
  try {
    const { product, seller } = req.body;
    let filter = {};
    if (product) {
      filter.product = product;
    }
    if (seller) {
      filter.seller = seller;
    }
    const bids = await Bid.find(filter)
      .populate("product")
      .populate("buyer")
      .populate("seller");
    res.send({
      sucess: true,
      message: bids,
    });
  } catch (error) {
    res.send({
      sucess: false,
      message: error.message,
    });
  }
};

module.exports = { placeNewBid, getAllbids };
