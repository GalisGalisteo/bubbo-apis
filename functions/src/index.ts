import * as functions from "firebase-functions";
import * as express from "express";
import { addBook, deleteBook, findBook, getBooks } from "./controller";

const app = express();

app.get("/books", getBooks);
app.post("/books", addBook);
app.get("/books/:id", findBook);
app.delete("/books/:id", deleteBook);

exports.app = functions.https.onRequest(app);
