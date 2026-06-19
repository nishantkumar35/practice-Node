const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");
const route = require("./routes/userroute");
const errorHandler = require("./middelware/errorHandler");
const rateLimit = require("express-rate-limit");
const {ipKeyGenerator} = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 5,
  keyGenerator: (req) => req.user?.id || ipKeyGenerator(req.ip),
  skip: (req) => req.path === "/home",
  handler: (req, res) => {
    res.status(429).json({ success: false, message: "Rate limit exceeded" });
  },
  store : undefined
});

app.use(express.json());

connectDB();

app.use("/api",limiter, route);

app.use(errorHandler);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
