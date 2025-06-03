const express = require("express");
const {
  createReviewController,
  getreviewbyidcontroller,
  deletereviewbyidcontroller,
  updateReviewController,
} = require("../controllers/reviewController");

const router = express.Router();

//  post data  by id
router.post("/create", createReviewController);

// Get reviews by book ID
router.get("/reviewget/:id", getreviewbyidcontroller);

// Delete a review by review ID
router.delete("/reviewdelete/:id", deletereviewbyidcontroller);

// update a review by review id

router.put("./reviwupdate/:id", updateReviewController);

module.exports = router;
