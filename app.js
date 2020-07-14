const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {
  createBook,
  readBook,
  updateBook,
  deleteBook,
} = require("./src/controllers/bookController");
mongoose
  .connect(process.env.DB_LOCAL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("successfully connected to the database"))
  .catch((err) => console.log(err));

const router = express.Router();
const {
  createGenre,
  readGenres,
} = require("./src/controllers/genreControllers");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

router.get("/", (req, res) => {
  return res.status(200).json({ status: "ok", data: [] });
});

//POST create new book
router.route("/books").get(readBook).post(createBook);

router.route("/books/:id").delete(deleteBook).put(updateBook);

router.route("/genres").post(createGenre).get(readGenres);

app.listen(process.env.PORT, () => {
  console.log("App is running on port", process.env.PORT);
});
