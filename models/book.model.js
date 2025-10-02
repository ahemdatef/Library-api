import mongoose from "mongoose";
import validator from "validator";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
      trim: true,
    },
    author: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
      validate: {
        validator: (value) => validator.isInt(String(value)),
        message: "Year must be a valid number!",
      },
    },
    genre: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
