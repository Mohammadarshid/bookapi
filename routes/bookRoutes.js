const express = require("express");
const authmiddlewares = require("../middlewares/authmiddlewares");
const {
  createBookController,
  getallbooksController,
  getbookbyidcontroller,
} = require("../controllers/bookcontroller");

const router = express.Router();

//  routes crete book
router.post("/create", authmiddlewares, createBookController);

//  routes get all books
router.get("/allbooks", getallbooksController);

//  routers get book by id
router.get("/booked/:id", getbookbyidcontroller);

module.exports = router;
