const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { placeNewBid, getAllbids } = require("../controller/bidController");

router.post("/place-new-bid", authMiddleware, placeNewBid);
router.post("/get-all-bids", authMiddleware, getAllbids);

module.exports = router;
