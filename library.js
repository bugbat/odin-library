let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function clearForm() {
  bookForm.reset();
}

Book.prototype.getInfo = function() {
  return this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ' + this.read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function updateLibrary() {
  bookshelf.replaceChildren(); // clears existing div content
  myLibrary.forEach(book => {
    const newdiv = document.createElement('div');
    newdiv.classList.add('book', myLibrary.indexOf(book));
    const title = document.createElement('p');
    title.textContent = book.title;
    newdiv.appendChild(title);
    const author = document.createElement('p');
    author.textContent = 'by ' + book.author;
    newdiv.appendChild(author);
    const pages = document.createElement('p');
    pages.textContent = book.pages + ' pages';
    newdiv.appendChild(pages);
    
    bookshelf.appendChild(newdiv);
  });
}

const book1 = new Book ('The Hobbit', 'Tolkien', 1000, 'read')

myLibrary.push(book1);

// library
const bookshelf = document.querySelector("#bookshelf")

// set up button and element variables
const dialogElem = document.querySelector("dialog");
const openDialogBtn = document.querySelector("#open-dialog");
const addBookBtn = document.querySelector("#add-book");

// form
const bookForm = document.querySelector('#book-form');
const titleField = bookForm['title']; //may not need?

openDialogBtn.addEventListener('click', function() {
  dialogElem.showModal();
})

// addBookBtn.addEventListener('click')