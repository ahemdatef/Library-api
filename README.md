📘 Library API Documentation
Overview

The Library API is a simple RESTful service built with Express.js and MongoDB (Mongoose).
It allows you to manage a library’s collection of books through standard CRUD operations.

Features

Create, Read, Update, Delete (CRUD) operations for books

Input validation with validator.js

Centralized error handling with custom AppError class

Clean project structure with separation of concerns

⚙️ Project Setup
Prerequisites

Node.js ≥ 16

MongoDB (local or cloud instance, e.g. MongoDB Atlas)

Installation
git clone <your-repo-url>
cd Library-api
npm install

Environment Variables (.env)
PORT=5500
DATABASE_URI=mongodb+srv://root:root@library-api.crv2zmo.mongodb.net/library-api?retryWrites=true&w=majority&appName=library-api

Running the Project
npm run server

The server runs at:
👉 http://localhost:5500

Test route:

GET /

Response:

"API working..."

🗂 Project Structure
Library-api/
│── server.js # Entry point
│── app.js # Express app setup
│── config/
│ └── database.js # MongoDB connection
│── models/
│ └── book.model.js # Mongoose schema
│── controllers/
│ └── book.controller.js # CRUD logic
│── routes/
│ └── book.routes.js # API routes
│── middlewares/
│ └── error.js # Global error handler
│── utils/
│ ├── AppError.js # Custom error class
│ └── catchAsync.js # Async wrapper

📝 Data Model: Book

Book Schema (book.model.js):

{
title: String (required),
author: String,
year: Number (validated as integer),
genre: String,
createdAt: Date,
updatedAt: Date
}

🔗 API Endpoints

1. Create Book

POST /api/v1/books

Body:

{
"title": "The Hobbit",
"author": "J.R.R. Tolkien",
"year": 1937,
"genre": "Fantasy"
}

Response: 201 Created

{
"success": true,
"book": {
"\_id": "650f2f...",
"title": "The Hobbit",
"author": "J.R.R. Tolkien",
"year": 1937,
"genre": "Fantasy"
}
}

2. Get All Books

GET /api/v1/books

Response: 200 OK

{
"success": true,
"result": 2,
"books": [
{ "_id": "650f2f...", "title": "The Hobbit", "author": "J.R.R. Tolkien" },
{ "_id": "650f3a...", "title": "Dune", "author": "Frank Herbert" }
]
}

3. Get Book by ID

GET /api/v1/books/:id

Response: 200 OK

{
"success": true,
"book": {
"\_id": "650f2f...",
"title": "The Hobbit",
"author": "J.R.R. Tolkien"
}
}

If not found: 404 Not Found

{ "success": false, "message": "Book not found!" }

4. Update Book

PUT /api/v1/books/:id

Body:

{
"title": "The Hobbit (Updated Edition)",
"year": 1951
}

Response: 200 OK

{
"success": true,
"book": {
"\_id": "650f2f...",
"title": "The Hobbit (Updated Edition)",
"author": "J.R.R. Tolkien",
"year": 1951
}
}

5. Delete Book

DELETE /api/v1/books/:id

Response: 200 OK

{ "success": true, "message": "Book deleted successfully." }

🚨 Error Handling

Centralized via errorMiddleware.js.

Common Errors

400 Bad Request → Validation errors, duplicate keys, invalid MongoDB ID

404 Not Found → Book not found

500 Internal Server Error → Uncaught server errors

Example Error Response
{
"success": false,
"message": "Book not found!"
}

📦 Dependencies

express → REST API framework

mongoose → MongoDB ODM

validator → Input validation

morgan → HTTP request logging

cors → Cross-origin resource sharing

dotenv → Environment variables

nodemon (dev) → Auto-restart on changes
