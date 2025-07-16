import express from 'express';
import {
  createContentBlock,
  getAllContentBlocks,
  getContentBlockById,
  updateContentBlock,
  deleteContentBlock,
  getContentBlockBySlug
} from '../controllers/contentBlockController.js';

const router = express.Router();

router.post('/', createContentBlock);

// GET all (with optional filtering by ?isActive=true etc)
router.get('/', getAllContentBlocks);

// GET by slug as route param
router.get('/slug/:slug', getContentBlockBySlug);

// GET by id
router.get('/:id', getContentBlockById);

router.put('/:id', updateContentBlock);
router.delete('/:id', deleteContentBlock);

export default router;

