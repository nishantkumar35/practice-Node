const {verifytoken} = require('../utils/jwt');

const authMiddelware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }
    const token = authHeader.split(" ")[1];
    const decode = verifytoken(token);
    req.user = decode;
    next();

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: " user not authrize",
      error: e.message,
    });
  }
};

module.exports = authMiddelware;