const express = require("express");

const router = express.Router();

router.post("/signup", (req, res) => {
  res.send("Ypu made a post Request");
});

module.exports = router;
