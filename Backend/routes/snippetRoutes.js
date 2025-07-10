import express from 'express';
import {
  addSnippet,
  getAllSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
  searchSnippets,
  incrementStar 
} from '../controllers/snippetController.js';

const router = express.Router();

router.post('/', addSnippet);
router.get('/', getAllSnippets);
router.get('/search', searchSnippets); //  /snippets/search?query=javascript
router.get('/:id', getSnippetById);
router.put('/:id', updateSnippet);
router.delete('/:id', deleteSnippet);
router.post('/:id/star', incrementStar);

export default router;
