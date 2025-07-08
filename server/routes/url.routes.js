const express = require("express");
const {
  createUrl,
  deleteUrl,
  getAllUrls,
} = require("../controllers/url.controllers");

const router = express.Router();

router.post("/", createUrl);
router.get("/", getAllUrls);
router.delete("/:id", deleteUrl);

module.exports = router;

