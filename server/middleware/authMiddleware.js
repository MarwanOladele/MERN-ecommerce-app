const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // get tokenfrom headers
    const token = req.header("authorization").split(" ")[1];
    const decryptedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.body.userId = decryptedToken.userId;
    next();
  } catch (error) {
    res.send({ sucess: false, message: error.message });
  }
};
