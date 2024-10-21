import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  isbn: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const BookModel = mongoose.model('Book', BookSchema);

export { BookModel };
