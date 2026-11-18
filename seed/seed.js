import mongoose from "mongoose";
import Book from '../models/Book.js'
import { bookInfo } from '../data/data.js'



// const mongoose = require('mongoose');
const uri = process.env.MONGO_URI

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    // await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Seed the database with book data
    await Book.deleteMany({}) // Clear existing data

    // Insert new book data from bookInfo array
    const insertedBooks = await Book.insertMany(bookInfo);
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);
