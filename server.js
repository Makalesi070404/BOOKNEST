import express from 'express'
import { join } from 'node:path'
import { bookInfo } from './data/data.js'
import methodOverride from 'method-override'
// import { title } from 'node:process'

import mongoose from 'mongoose'
import dotenv from 'dotenv'

import Book from './models/Book.js'

dotenv.config();

const PORT = 5000

console.log(bookInfo);


const app = express()


// Serve static file from the public folder
app.use(express.static(join(import.meta.dirname, "public")))


// To get data coming from forms, we can use this middleware to parse URL-encoded form data (default for HTML forms)
app.use(express.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

// Set EJS as the template engine for the server
app.set('view engine', 'ejs')

const uri = process.env.MONGO_URI
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    // await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await mongoose.disconnect();
  }
}
run().catch(console.dir);

// Home Page Route
// HOME PAGE
app.get('/', async (req, res) => {
    const books = await Book.find({});
    res.render('index', { title: 'BookNest', bookInfo: books });
});


// BOOK LIST
app.get('/books', async (req, res) => {
    const books = await Book.find({});
    res.render('books', { title: 'Book List', books });
});


// NEW BOOK FORM
app.get('/book/new', (req, res) => {
    res.render('new-book', { title: 'Add New Book' });
});


// CREATE NEW BOOK
app.post('/books/new', async (req, res) => {
    const { title, author, genre, pages } = req.body;

    await Book.create({
        title,
        author,
        genre,
        pages
    });

    res.redirect('/books');
});


// SINGLE BOOK PAGE
app.get('/books/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        return res.status(404).render('not-found', { title: 'Page Not Found' });
    }

    res.render('book-page', { title: book.title, book });
});


// EDIT BOOK FORM
app.get('/books/:id/edit', async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        return res.status(404).render('not-found', { title: 'Page Not Found' });
    }

    res.render('edit-book', { title: 'Edit Book', book });
});


// UPDATE BOOK
app.patch('/books/:id', async (req, res) => {
    const { title, author, genre, pages } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        { title, author, genre, pages },
        { new: true }
    );

    if (!updatedBook) {
        return res.status(404).render('not-found', { title: 'Page Not Found' });
    }

    res.redirect('/books');
});


// DELETE BOOK
app.delete('/books/:id', async (req, res) => {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
        return res.status(404).render('not-found', { title: 'Page Not Found' });
    }

    res.redirect('/books');
});


// 404 HANDLER
app.use((req, res) => {
    res.status(404).render('not-found', { title: 'Page Not Found' });
});


app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
})

