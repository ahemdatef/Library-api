import Book from "../models/book.model.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

// create book
export const createBook = catchAsync(async (req, res, next) => {
  const { title, author, year, genre } = req.body;

  if (!title) {
    return next(new AppError("Title is required!", 400));
  }

  const book = await Book.create({ title, author, year, genre });

  res.status(201).json({
    success: true,
    book,
  });
});

// get all books
export const getBooks = catchAsync(async (req, res, next) => {
  const books = await Book.find();

  res.status(200).json({
    success: true,
    result: books.length,
    books,
  });
});

// get single book by id
export const getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new AppError("Book not found!", 404));
  }

  res.status(200).json({
    success: true,
    book,
  });
});

// update book
export const updateBook = catchAsync(async (req, res, next) => {
  const { title, author, year, genre } = req.body;

  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      title,
      author,
      year,
      genre,
    },
    { new: true, runValidators: true }
  );

  if (!book) {
    return next(new AppError("Book not found!", 404));
  }

  res.status(200).json({
    success: true,
    book,
  });
});

// delete book
export const deleteBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) {
    return next(new AppError("Book not found!", 404));
  }

  res.status(200).json({
    success: true,
    message: "Book deleted successfully.",
  });
});
