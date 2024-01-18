import * as functions from "firebase-functions";
import * as express from "express";
import { addBook, getBooks } from "./controller";

const app = express();

app.get("/books", getBooks);

app.post("/books", addBook);

exports.app = functions.https.onRequest(app);
