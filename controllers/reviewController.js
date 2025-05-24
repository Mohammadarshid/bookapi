const ReviewModel = require("../models/ReviewModel");

const createReviewController = async (req, res) => {
  try {
    const { bookId } = req.params.id;
    console.log("Received body:", req.body);
    const { review, rating, description, comment } = req.body;
    if (!review || !rating || !description || comment) {
      return res.status(400).send({
        sucess: false,
        message: "Please fill all  the fields",
      });
    }

    const booked = await ReviewModel.findById({ bookId: bookId });
    if (!booked) {
      return res.status(404).send({
        success: false,
        message: "booked not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "booked found",
      booked,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in create review",
      error,
    });
  }
};

module.exports = { createReviewController };
