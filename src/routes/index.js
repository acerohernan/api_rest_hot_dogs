const express = require("express");
const authRouter = require("./auth.route");
const dogRouter = require("./dog.route");

const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/dog", dogRouter);

module.exports = router;