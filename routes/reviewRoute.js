const express = require("express");
const {
  createReviewController,
  getreviewbyidcontroller,
  deletereviewbyidcontroller,
} = require("../controllers/reviewController");

const router = express.Router();

// routes to create a review for a book
router.post("/reviewadd", createReviewController);

//   routes to get review  by book id

router.get("/reviewget/:id", getreviewbyidcontroller);

// routes to delete a reviewby id

router.delete("/reviewdelete/:id", deletereviewbyidcontroller);

module.exports = router;

// C:\Users\LENOVO\Desktop\book api\routes\reviewRoute.js
