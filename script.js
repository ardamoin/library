let myLibrary = [];
let table = document.querySelector("tbody");
const submit = document.querySelector(".submit");
let bookName = document.querySelector("input#book");
let author = document.querySelector("input#author");
let pages = document.querySelector("input#pages");
let status = document.querySelector("select#read");

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

function updateTable(book) {
    let newRow = document.createElement("tr");
    let title = document.createElement("td");
    let author = document.createElement("td");
    let pages = document.createElement("td");
    let read = document.createElement("td");
    let readButton = document.createElement("button");

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    readButton.textContent = book.read;
    read.appendChild(readButton);

    newRow.appendChild(title);
    newRow.appendChild(author);
    newRow.appendChild(pages);
    newRow.appendChild(read);

    table.appendChild(newRow);
}

function clearInputs() {
    bookName.value = '';
    author.value = '';
    pages.value = '';
    read.value = 'Read';
}

addBookToLibrary(new Book("Harry Potter", "JK Rowling", "420", "Read"));
addBookToLibrary(new Book("Game of Thrones", "GRRM", "500", "Read"));

for(let book of myLibrary) {
    updateTable(book);
}


submit.addEventListener("click", () => {
    if (bookName.value !== '' && author.value !== '' && pages.value !== '') {
        const newBook = new Book(bookName.value, author.value, pages.value, read.value);
        addBookToLibrary(newBook);
        updateTable(newBook);
        clearInputs();
    }
})