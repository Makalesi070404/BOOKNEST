# About the Project
BOOKNEST is a small library management website where users can:
-View all books
-View a single book pag
-Add new books
-Edit existing books
-Delete books
-See a custom 404 page
The project uses server‑side rendering with EJS and stores all book data in MongoDB Atlas using Mongoose.

# Technology Used
Node.js — backend runtime

Express — web framework

MongoDB Atlas — cloud database

Mongoose — ODM for MongoDB

EJS — template engine

Method‑Override — enables PUT & DELETE in forms


# Installation
Install dependencies:
-npm i express
-npm i ejs
-npm install mongoose
-npm install method-override

Initialize the project:
npm init -y && npm pkg set type=module

# Setup
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000

# Running the App
node --watch server ||  If successful, you’ll see: You successfully connected to MongoDB!
Server running at http://localhost:5000

# Main Features
Home Page — displays all books

Books List — shows full library

Add Book — form to create new books

Edit Book — update existing entries

Delete Book — remove books

404 Page — custom not‑found page

# How It Works
Express handles routing

EJS renders dynamic pages

Mongoose interacts with MongoDB

Method‑override allows PUT/PATCH/DELETE

Static files served from /public

All CRUD operations are async

