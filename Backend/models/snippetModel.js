import mongoose from 'mongoose';

const snippetSchema = new mongoose.Schema({
  title: String,
  code: String,
  language: String,
  author: String,
  stars: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Snippet', snippetSchema);
