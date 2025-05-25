const ReviewModel = require("../models/ReviewModel");

const createReviewController = async (req, res) => {
  try {
    // const { bookId } = req.params.id;
    const { bookId, review, rating, description, comment } = req.body;
    // if (!bookId || !review || !rating || !description || comment) {
    //   return res.status(400).send({
    //     sucess: false,
    //     message: "Please fill all  the fields",
    //   });
    // }

    // //    create review
    // const reviewdata = new ReviewModel({
    //   bookId,
    //   review,
    //   rating,
    //   description,
    //   comment,
    // });
    // console.log(reviewdata);
    const reviewdata = new ReviewModel({
      bookId,
      review,
      rating,
      description,
      comment,
    });
    await reviewdata.save();
    console.log("Saved Review ID:", reviewdata._id); // ✅ helpful for future delete

    // await reviewdata.save();

    // if (!booked) {
    //   return res.status(404).send({
    //     success: false,
    //     message: "booked not found",
    //   });
    // }
    // const booked = await ReviewModel.create(info);
    res.status(200).send({
      success: true,
      message: "booked found",
      reviewdata,
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

const getreviewbyidcontroller = async (req, res) => {
  try {
    const { Id } = req.params;

    const book = await ReviewModel.findById(Id);
    if (!book) {
      return res.status(404).send({
        success: false,
        message: "Book not found",
      });
    }
    const reviews = await ReviewModel.find({ bookId: Id });
    res.status(200).send({
      success: true,
      message: "review fetched successfully",
      reviews,
    });
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching book by ID",
      error,
    });
  }
};

// const deletereviewbyidcontroller = async (req, res) => {
//   try {
//     const { id } = req.params.body;

//     if (id) {
//       return res.status(400).send({
//         success: false,
//         message: "Review ID is required",
//       });
//     }

//     const deletedReview = await ReviewModel.findByIdAndDelete(id);
//     console.log("deletedreview", deletedReview);

//     if (!deletedReview) {
//       return res.status(404).send({
//         success: false,
//         message: "No review found with the given ID",
//       });
//     }

//     res.status(200).send({
//       success: true,
//       message: "Review deleted successfully",
//       data: deletedReview,
//     });
//   } catch (error) {
//     console.error("Error deleting review:", error);
//     res.status(500).send({
//       success: false,
//       message: "Error in delete review API",
//       error: error.message,
//     });
//   }
// };

const deletereviewbyidcontroller = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Review ID is required",
      });
    }

    const deletedReview = await ReviewModel.findByIdAndDelete(id);
    console.log("deletedReview", deletedReview);

    if (!deletedReview) {
      return res.status(404).send({
        success: false,
        message: "No review found with the given ID",
      });
    }

    res.status(200).send({
      success: true,
      message: "Review deleted successfully",
      data: deletedReview,
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).send({
      success: false,
      message: "Error in delete review API",
      error: error.message,
    });
  }
};

module.exports = {
  createReviewController,
  getreviewbyidcontroller,
  deletereviewbyidcontroller,
};
