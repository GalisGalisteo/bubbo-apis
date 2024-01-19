import { Request, Response } from "express";
import { db } from "./config/firebase";
import { Book } from "./domain/Book";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books: Book[] = [];
    const booksSnapshot = await db.collection("books").get();
    booksSnapshot.forEach((doc) => {
      const { author, title } = doc.data();
      const { id } = doc;
      books.push({ author, title, id });
    });
    res.status(200).json(books);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message);
    } else {
      res.status(500).json("An unknown error occurred");
    }
  }
};

export const addBook = async (req: Request, res: Response) => {
  const { author, title } = req.body;
  try {
    const book = await db.collection("books").doc();
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
    if (error instanceof Error) {
      res.status(500).json(error.message);
    } else {
      res.status(500).json("An unknown error occurred");
    }
  }
};

export const findBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // const book: Book[] = [];
    const bookRef = db.collection("books").doc(id);
    const doc = await bookRef.get();

    // const newBook = new Book(id, book.data().author, book.data().title);

    // book.push(booksSnapshot);
    res.status(200).json(doc.data());
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message);
    } else {
      res.status(500).json("An unknown error occurred");
    }
  }
};
