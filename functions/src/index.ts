import * as functions from "firebase-functions";
import * as express from "express";
import { addBook } from "./controller";

const app = express();

app.get("/", (req, res) => res.status(200).send("Hey there!"));

app.post("/books", addBook);

exports.app = functions.https.onRequest(app);
