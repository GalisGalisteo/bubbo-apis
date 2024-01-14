export class Book {
  public id: string;
  public author: string;
  public title: string;

  constructor(id: string, author: string, title: string) {
    this.id = id;
    this.author = author;
    this.title = title;
  }
}
