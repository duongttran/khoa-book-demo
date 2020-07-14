const mongoose = require("mongoose");

//create Schema
const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
    trim: true,
  },
  author: String,
});

//create model
const Book = mongoose.model("Book", bookSchema);

//export model
module.exports = Book;
