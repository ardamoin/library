let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    let duplicate = false;

    for(let libraryBook of myLibrary) {
        if (libraryBook.title === book.title) {
            duplicate = true;
        }
    }

    if (!duplicate) myLibrary.push(book);

}