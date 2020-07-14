const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {
  createAuthor,
  readAuthor,
  updateAuthor,
  deleteAuthor,
} = require("./src/controllers/authorController");
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

router.get("/", (req, res) => {
  return res.status(200).json({ status: "ok", data: [] });
});

//why this doesn't work with router.get(/authors)and why can't I use {{url}}?

//POST create new author
router.route("/authors").get(readAuthor).post(createAuthor);

router.route("/authors/:id").delete(deleteAuthor).put(updateAuthor);

app.listen(process.env.PORT, () => {
  console.log("App is running on port", process.env.PORT);
});
