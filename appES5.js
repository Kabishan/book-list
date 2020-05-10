function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

/* Empty UI constructor, no properties, only prototype methods */
function UI() {}

UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');
  const row = document.createElement('tr');
  row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`;
  list.appendChild(row);
};

UI.prototype.showAlert = function (msg, className) {
  const alert = document.createElement('div');
  const container = document.querySelector('.container');
  const form = document.getElementById('book-form');

  alert.className = `alert ${className}`;
  alert.appendChild(document.createTextNode(msg));

  container.insertBefore(alert, form);

  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
};

UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

function Store() {}

const store = new Store();

Store.prototype.getBooks = function () {
  let books;

  if (localStorage.getItem('books') === null) books = [];
  else books = JSON.parse(localStorage.getItem('books'));

  return books;
};

Store.prototype.displayBooks = function () {
  const books = store.getBooks();

  books.forEach(function (book) {
    const ui = new UI();
    ui.addBookToList(book);
  });
};

Store.prototype.addBook = function (book) {
  const books = store.getBooks();

  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
};

Store.prototype.deleteBook = function (isbn) {
  const books = store.getBooks();

  books.forEach(function (book, index) {
    if (book.isbn === isbn) books.splice(index, 1);
  });

  localStorage.setItem('books', JSON.stringify(books));
};

const bookForm = document.getElementById('book-form');
const bookList = document.getElementById('book-list');

document.addEventListener('DOMContentLoaded', store.displayBooks);

bookForm.addEventListener('submit', bookCreation);

function bookCreation(e) {
  const UITitle = document.getElementById('title').value,
    UIAuthor = document.getElementById('author').value,
    UIIsbn = document.getElementById('isbn').value;

  const book = new Book(UITitle, UIAuthor, UIIsbn);

  const ui = new UI();

  if (UITitle === '' || UIAuthor === '' || UIIsbn === '') {
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    ui.addBookToList(book);
    store.addBook(book);
    ui.showAlert('Book added...', 'success');
    ui.clearFields();
  }

  e.preventDefault();
}

bookList.addEventListener('click', function (e) {
  const ui = new UI();

  ui.deleteBook(e.target);

  if (e.target.className === 'delete') {
    ui.showAlert('Book deleted...', 'success');
    store.deleteBook(e.target.parentElement.previousElementSibling.textContent);
  }

  e.preventDefault();
});
