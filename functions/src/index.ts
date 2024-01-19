import * as functions from "firebase-functions";
import * as express from "express";
import { addBook, findBook, getBooks } from "./controller";

const app = express();

app.get("/books", getBooks);
app.post("/books", addBook);
app.get("/books/:id", findBook);

exports.app = functions.https.onRequest(app);
