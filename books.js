const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());  // middleware to pass JSON requests

// Define the array of books
let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
]

// routes

// to get all books
app.get('/books', (req, res) => {
  res.json(books);
})


// to get a single book
app.get('/books/:id', (req, res) => {
  const bookID = parseInt(req.params.id);
  const book = books.find(book => book.id === bookID);

  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }

})

// to add a new book

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = { 
    id: books.length + 1,
     title, 
     author 
  };

  books.push(newBook);
  res.status(201).json(newBook);
})


// to update a book
app.put('/books/:id', (req, res) => {
  const bookID = parseInt(req.params.id);
  const { title, author } = req.body; 
  const bookIndex = books.findIndex(book => book.id === bookID);

  if(!bookIndex) {
    return res.status(404).send({ message: 'Book not found' });
  }

  book.title = title || book.title;
  book.author = author || book.author;
  
  res.json(book);
 
  
})


// to delete a book
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(book => book.id === bookId);

  if(bookIndex === -1) {
    return res.status(404).send({ message: 'Book not found' });
  }

  books.splice(bookIndex, 1);
  res.status(204).send();
})

// port to listen on the server

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Bookstore API running on http://localhost:${PORT}`);
});