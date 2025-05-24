const express = require("express");
const { createReviewController } = require("../controllers/reviewController");

const router = express.Router();

// routes to create a review for a book
router.post("/booksrev/:id", createReviewController);

module.exports = router;

// C:\Users\LENOVO\Desktop\book api\routes\reviewRoute.js
