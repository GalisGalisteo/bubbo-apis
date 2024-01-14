import { Request, Response } from "express";
import { db } from "./config/firebase";
import { Book } from "./domain/Book";

export const addBook = async (req: Request, res: Response) => {
  const { author, title } = req.body;
  try {
    const book = db.collection("books").doc();
    const newBook: Book = {
      id: book.id,
      author,
      title,
    };

    book.set(newBook);

    res.status(200).send({
      status: "success",
      message: "entry added successfully",
      data: newBook,
    });
  } catch (error) {
    res.status(500).json;
  }
};
