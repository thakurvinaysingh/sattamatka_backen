import express from 'express';
import {
  createResult,
  getAllResults,
  getResultById,
  updateResult,
  deleteResult,
  countResults
} from '../controllers/resultController.js';

const router = express.Router();
router.get('/count', countResults);
router.post('/', createResult);
router.get('/', getAllResults);
router.get('/:id', getResultById);
router.put('/:id', updateResult);
router.delete('/:id', deleteResult);


export default router;
