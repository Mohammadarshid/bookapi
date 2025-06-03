const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
    },
    description: {
      type: String,
    },
    publishedYear: {
      type: Number,
    },

    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
