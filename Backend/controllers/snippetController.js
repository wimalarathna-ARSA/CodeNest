import Snippet from '../models/snippetModel.js'; 

// Add a new snippet
export const addSnippet = async (req, res) => {
  try {
    const { title, code, language, author } = req.body;
    const newSnippet = new Snippet({ title, code, language, author });
    await newSnippet.save();
    res.status(201).json({ message: 'Snippet added successfully', snippet: newSnippet });
  } catch (error) {
    res.status(500).json({ message: 'Error adding snippet', error });
  }
};

// Get all snippets
export const getAllSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find().sort({ date: -1 });
    res.json(snippets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching snippets', error });
  }
};

// Get single snippet by ID
export const getSnippetById = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });
    res.json(snippet);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching snippet', error });
  }
};

// Update a snippet
export const updateSnippet = async (req, res) => {
  try {
    const updatedSnippet = await Snippet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSnippet) return res.status(404).json({ message: 'Snippet not found' });
    res.json({ message: 'Snippet updated', snippet: updatedSnippet });
  } catch (error) {
    res.status(500).json({ message: 'Error updating snippet', error });
  }
};

// Delete a snippet
export const deleteSnippet = async (req, res) => {
  try {
    const deletedSnippet = await Snippet.findByIdAndDelete(req.params.id);
    if (!deletedSnippet) return res.status(404).json({ message: 'Snippet not found' });
    res.json({ message: 'Snippet deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting snippet', error });
  }
};

// Search snippets by title or language
export const searchSnippets = async (req, res) => {
  try {
    const { query } = req.query;
    const results = await Snippet.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { language: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error searching snippets', error });
  }
};

export const incrementStar = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });

    snippet.stars += 1;
    await snippet.save();

    res.json({ stars: snippet.stars });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update stars', error });
  }
};