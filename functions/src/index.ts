import * as functions from "firebase-functions";
import * as express from "express";
import {
  addBook,
  deleteBook,
  findBook,
  getBooks,
  updateBook,
} from "./controller";

const app = express();

app.get("/books", getBooks);
app.post("/books", addBook);
app.get("/books/:id", findBook);
app.delete("/books/:id", deleteBook);
app.put("/books/:id", updateBook);

exports.app = functions.https.onRequest(app);
