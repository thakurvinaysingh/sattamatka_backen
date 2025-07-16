import express from 'express';
import {
  createPageView,
  getAllPageViews,
  getPageViewById,
  updatePageView,
  deletePageView
} from '../controllers/pageViewController.js';

const router = express.Router();

router.post('/', createPageView);
router.get('/', getAllPageViews);
router.get('/:id', getPageViewById);
router.put('/:id', updatePageView);
router.delete('/:id', deletePageView);

export default router;
