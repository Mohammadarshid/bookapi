const reviewModel = require("../models/ReviewModel");
const createReviewController = async (req, res) => {
  try {
    const { bookId, review, rating, description, comment } = req.body;

    if (!bookId || !review || !rating) {
      return res.status(400).json({
        success: false,
        message: "bookId, review, and rating are required.",
      });
    }

    const newReview = new reviewModel({
      bookId,
      review,
      rating,
      description,
      comment,
    });

    const savedReview = await newReview.save();
    console.log(savedReview);
    return res.status(201).json({
      success: true,
      message: "Review created successfully.",
      data: savedReview,
    });
  } catch (error) {
    console.error("Error creating review:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};

// GET REVIEWS BY BOOK ID
const getreviewbyidcontroller = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching reviews for booked ID:", id);

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Book ID is required",
        id,
      });
    }
    const review = await reviewModel.find({ bookId: id });

    console.log(review);

    res.status(200).send({
      success: true,
      message: "Reviews fetched successfully.",
      review,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).send({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// DELETE REVIEW BY REVIEW ID
const deletereviewbyidcontroller = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    if (!id) {
      res.status(400).send({
        success: false,
        message: "Review ID is required",
      });
    }

    const deletedReview = await reviewModel.findByIdAndDelete(id);
    console.log("deletedReview:");

    if (!deletedReview) {
      return res.status(404).send({
        success: false,
        message: "No review found with the given ID.",
      });
    }

    res.status(200).send({
      success: true,
      message: "Review deleted successfully.",
      deletedReview,
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).send({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// UPDATE REVIEW BY REVIEW ID
const updateReviewController = async (req, res) => {
  try {
    const { id } = req.params;
    const { review, rating, description, comment } = req.body;

    const updatedReview = await reviewModel.findByIdAndUpdate(
      id,
      { review, rating, description, comment },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).send({
        success: false,
        message: "No review found with the given ID.",
      });
    }

    res.status(200).send({
      success: true,
      message: "Review updated successfully.",
      updatedReview,
    });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).send({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createReviewController,
  getreviewbyidcontroller,
  deletereviewbyidcontroller,
  updateReviewController,
};
