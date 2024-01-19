export class Book {
  readonly id: string;
  public author: string;
  public title: string;
  public summary: string;
  public yearPublished: string;
  public genre: string;
  public isbn: string;
  public dateCreated: Date;

  constructor(
    id: string,
    author: string,
    title: string,
    summary: string,
    yearPublished: string,
    genre: string,
    isbn: string
  ) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.summary = summary;
    this.yearPublished = yearPublished;
    this.genre = genre;
    this.isbn = isbn;
    this.dateCreated = new Date();
  }
}
