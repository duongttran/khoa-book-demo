const Book = require("../models/book");

exports.createBook = async (req, res) => {
  const { title } = req.body;

  //why not !== "Str..."?
  //   if (!name || typeof name !== "string")
  //     return res.status(400).json({ status: "fail", error: "invalid input" });
  //create an author with the name = name
  try {
    const book = await Book.create({ title: title });
    return res.status(201).json({ status: "ok", data: book });
  } catch (err) {
    return res.status(400).json({ status: "fail", error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  console.log(req.params);
  //const { id } = req.body;
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndUpdate(
      id,
      { title: req.body.title },
      { new: true }
    );
    return res.status(200).json({ status: "ok", data: book });
  } catch (err) {
    return res.status(400).json({ status: "fail", error: err.message });
  }
};

exports.readBook = async (req, res) => {
  const books = await Book.find();
  return res.status(200).json({
    status: "ok",
    data: books,
  });
};

exports.deleteBook = async (req, res) => {
  console.log(req.params);
  //const { id } = req.body;
  const { id } = req.params;
  try {
    await Book.findByIdAndDelete(id);
    return res.status(204).json({ status: "ok", data: null });
  } catch (err) {
    return res.status(400).json({ status: "fail", error: err.message });
  }
};
