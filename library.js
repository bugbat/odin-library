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
  return this.title 
  + ' by ' + this.author 
  + ', ' + this.pages 
  + ' pages, ' + this.read;
}

function createBook(event) {
  if (bookForm.checkValidity()) {
    const newBook = new Book(bookForm['title'].value,
                            bookForm['author'].value,
                            bookForm['pages'].value,
                            bookForm['read'].checked);
    addBookToLibrary(newBook);
    updateLibrary();
    dialogElem.close();
  }
  // should add something here to show validation error 
  event.preventDefault();
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function deleteBook(book_id) {
  myLibrary.splice(book_id, 1);
}

function changeRead(book_id) {
  myLibrary[book_id].read = !myLibrary[book_id].read;
}

function updateLibrary() {
  bookshelf.replaceChildren(); // clears existing div content
  myLibrary.forEach(book => {
    // set up div
    const newdiv = document.createElement('div');
    newdiv.classList.add('book');
    newdiv.dataset.id = myLibrary.indexOf(book);
    const title = document.createElement('p');
    title.textContent = book.title;
    newdiv.appendChild(title);
    const author = document.createElement('p');
    author.textContent = 'by ' + book.author;
    newdiv.appendChild(author);
    const pages = document.createElement('p');
    pages.textContent = book.pages + ' pages';
    newdiv.appendChild(pages);
    
    // add div buttons
    const readCheckboxLbl = document.createElement('label');
    readCheckboxLbl.textContent = 'Read?';
    newdiv.appendChild(readCheckboxLbl);
    const readCheckbox = document.createElement('input');
    readCheckbox.type = 'checkbox';
    readCheckbox.name = 'read-book'
    readCheckbox.id = 'read-book';
    if (book.read === true) {
      readCheckbox.checked = 'true';
    }
    readCheckbox.addEventListener('click', function() {
      changeRead(newdiv.dataset.id);
    })
    newdiv.appendChild(readCheckbox);

    const deleteBookBtn = document.createElement('button');
    deleteBookBtn.textContent = 'Remove book';
    deleteBookBtn.classList.add('delete-book');
    deleteBookBtn.addEventListener('click', function() {
      deleteBook(newdiv.dataset.id);
      updateLibrary();
    })
    newdiv.appendChild(deleteBookBtn);
    
    bookshelf.appendChild(newdiv);
  });
}

function testData() {
  const book1 = new Book ('The Hobbit', 'Tolkien', 1000, true)
  const book2 = new Book ('The Hobbit 2', 'Token', 420, false)
  myLibrary.push(book1);
  myLibrary.push(book2);
  updateLibrary()
}

// library
const bookshelf = document.querySelector("#bookshelf")

// set up button and element variables
const dialogElem = document.querySelector("dialog");
const openDialogBtn = document.querySelector("#open-dialog");
const closeDialogBtn = document.querySelector('#cancel-add');
const addBookBtn = document.querySelector("#add-book");

// form
const bookForm = document.querySelector('#book-form');
const titleField = bookForm['title']; //may not need?

openDialogBtn.addEventListener('click', function() {
  dialogElem.showModal();
})

closeDialogBtn.addEventListener('click', function() {
  clearForm();
})


addBookBtn.addEventListener('click', createBook, false);