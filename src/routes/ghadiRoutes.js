import express from 'express';
import {
  createGhadi,
  getAllGhadis,
  getGhadiById,
  updateGhadi,
  deleteGhadi,
  countGhadis
} from '../controllers/ghadiController.js';

const router = express.Router();
router.get('/count', countGhadis);
router.post('/', createGhadi);
router.get('/', getAllGhadis);
router.get('/:id', getGhadiById);
router.put('/:id', updateGhadi);
router.delete('/:id', deleteGhadi);


export default router;
