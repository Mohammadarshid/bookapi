//   create book

const Bookmodel = require("../models/Bookmodel");

const createBookController = async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      description,
      publishedYear,
      averageRating,
      totalReviews,
    } = req.body;
    // validation

    if (
      !title ||
      !author ||
      !genre ||
      !description ||
      !publishedYear ||
      !averageRating ||
      !totalReviews
    ) {
      return res.status(500).send({
        success: false,
        message: " please fill all the fileds",
      });
    }
    //  create book
    const book = new Bookmodel({
      title,
      author,
      genre,
      description,
      publishedYear,
      averageRating,
      totalReviews,
    });
    console.log(book);

    await book.save();

    res.status(201).send({
      success: true,
      message: "Book created Successfully",
      book,
    });
  } catch (error) {
    console.log("error");
    res.status(500).send({
      success: false,
      message: "Error in create book",
      error,
    });
  }
};

const getallbooksController = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;

    const filter = {};
    if (author) filter.author = author;
    if (genre) filter.genre = genre;

    const books = await Bookmodel.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Bookmodel.countDocuments(filter);
    console.log(books);

    res.status(200).send({
      success: true,
      message: "Books fetched successfully",
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      books,
    });
  } catch (error) {
    console.error("Error fetching books", error);
    res.status(500).send({
      success: false,
      message: "Error fetching books",
      error,
    });
  }
};

//   getbookbyidcontroller

const getbookbyidcontroller = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 5 } = req.query;

    const book = await Bookmodel.findById(id);
    if (!book) {
      return res.status(404).send({
        success: false,
        message: "Book not found",
      });
    }

    const reviews = await Bookmodel.find({ bookId: id })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalReviews = await Bookmodel.countDocuments({ bookId: id });

    res.status(200).send({
      success: true,
      message: "Book fetched successfully",
      book,
      averageRating: book.averageRating,
      totalReviews,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalReviews / limit),
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



module.exports = {
  createBookController,
  getallbooksController,
  getbookbyidcontroller,
};
