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
            alert(`${book.title} already exists in the library`);
        }
    }

    if (!duplicate) myLibrary.push(book);

    return duplicate;
}

function removeBookFromLibrary(title) {
    myLibrary = myLibrary.filter(book => book.title !== title);
}

function updateTable(book) {
    let newRow = document.createElement("tr");
    let title = document.createElement("td");
    let author = document.createElement("td");
    let pages = document.createElement("td");
    let read = document.createElement("td");
    let readButton = document.createElement("button");
    let removeCell = document.createElement("td");
    let removeButton = document.createElement("button");
    readButton.classList.add("read-button");
    removeCell.classList.add("remove-cell");
    removeButton.classList.add("remove-button", "btn", "btn-outline-danger");

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    readButton.textContent = book.read;
    removeButton.textContent = 'Remove'

    readButton.setAttribute('booktitle', title.textContent);
    removeButton.setAttribute('booktitle', title.textContent);
    readButton.textContent === 'Read' ? readButton.classList.add("btn", "btn-outline-success") : readButton.classList.add("btn", "btn-outline-warning");

    removeButton.addEventListener('click', function() {
        const currentTitle = removeButton.getAttribute('booktitle');
        const currentRow = removeButton.parentElement.parentElement;

        if (confirm(`Are you sure you want to remove ${currentTitle}?`)) {
            removeBookFromLibrary(currentTitle);
            currentRow.remove();
        }
        
    })

    readButton.addEventListener('click', function() {
        console.log(this.classList);
        switch (readButton.textContent) {
            case 'Read':
                this.classList.remove('btn-outline-success');
                this.classList.add('btn-outline-warning');
                readButton.textContent = 'Not read';
                myLibrary.filter(book => book.title === this.getAttribute('booktitle'))[0].read = 'Not read';
                break;

            case 'Not read':
                this.classList.remove('btn-outline-warning');
                this.classList.add('btn-outline-success');
                readButton.textContent = 'Read';
                myLibrary.filter(book => book.title === this.getAttribute('booktitle'))[0].read = 'Read';
                break;
        }
    })


    newRow.appendChild(title);
    newRow.appendChild(author);
    newRow.appendChild(pages);
    newRow.appendChild(read);
    read.appendChild(readButton);
    newRow.appendChild(removeCell);
    removeCell.appendChild(removeButton);
    
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

let readButtons = document.querySelectorAll(".read-button");

submit.addEventListener("click", () => {
    if (bookName.value !== '' && author.value !== '' && pages.value !== '') {
        const newBook = new Book(bookName.value, author.value, pages.value, read.value);

        if (!addBookToLibrary(newBook)) {
            updateTable(newBook);
        } 
        
        clearInputs();
    }
})