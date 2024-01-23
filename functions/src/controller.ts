import { Request, Response } from "express";
import { db } from "./config/firebase";
import { Book } from "./domain/Book";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books: Book[] = [];
    const booksSnapshot = await db
      .collection("books")
      .orderBy("dateCreated", "desc")
      .get();
    booksSnapshot.forEach((doc) => {
      const { author, title, yearPublished, genre, isbn, image, dateCreated } =
        doc.data();
      const { id } = doc;
      books.push({
        id,
        author,
        title,
        yearPublished,
        genre,
        isbn,
        image,
        dateCreated,
      });
    });
    res.status(200).json({
      status: "success",
      data: books,
    });
  } catch (error) {
    res.status(500).json(`there is an error ${error}`);
  }
};

export const addBook = async (req: Request, res: Response) => {
  const { author, title, yearPublished, genre, isbn, image } = req.body;
  try {
    const book = db.collection("books").doc();
    const newBookClass = new Book(
      book.id,
      author,
      title,
      yearPublished,
      genre,
      isbn,
      image
    );

    const newBook: Book = {
      id: book.id,
      author: author,
      title: title,
      yearPublished: yearPublished,
      genre: genre,
      isbn: isbn,
      image: image,
      dateCreated: newBookClass.dateCreated,
    };

    await book.set(newBook);

    res.status(200).send({
      status: "success",
      message: "book added successfully",
      data: newBook,
    });
  } catch (error) {
    res.status(500).json(`there is an error ${error}`);
  }
};

export const findBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const bookRef = db.collection("books").doc(id);
    const doc = await bookRef.get();

    res.status(200).json({
      status: "success",
      message: "book updated successfully",
      data: doc.data(),
    });
  } catch (error) {
    res.status(500).json(`there is an error ${error}`);
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const bookRef = db.collection("books").doc(id);
    await bookRef.delete();
    res.status(200).json({
      status: "success",
      message: "book deleted successfully",
    });
  } catch (error) {
    res.status(500).json(`there is an error ${error}`);
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { author, title, yearPublished, genre, isbn, image } = req.body;
  const { id } = req.params;

  try {
    const bookRef = db.collection("books").doc(id);
    const updatedBook = {
      author: author,
      title: title,
      yearPublished: yearPublished,
      genre: genre,
      isbn: isbn,
      image: image,
    };

    await bookRef.update(updatedBook);

    res.status(200).json({
      status: "success",
      message: "book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json(`there is an error ${error}`);
  }
};
