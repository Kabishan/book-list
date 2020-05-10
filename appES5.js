function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

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

UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

const bookForm = document.getElementById('book-form');

bookForm.addEventListener('submit', bookCreation);

function bookCreation(e) {
  const UITitle = document.getElementById('title').value,
    UIAuthor = document.getElementById('author').value,
    UIIsbn = document.getElementById('isbn').value;

  const book = new Book(UITitle, UIAuthor, UIIsbn);

  const ui = new UI();

  ui.addBookToList(book);

  ui.clearFields();

  e.preventDefault();
}
