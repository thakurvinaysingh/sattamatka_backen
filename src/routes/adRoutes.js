import express from 'express';
import {
  createAd,
  getAllAds,
  getAdById,
  updateAd,
  deleteAd
} from '../controllers/adController.js';

const router = express.Router();

router.post('/', createAd);
router.get('/', getAllAds);
router.get('/:id', getAdById);
router.put('/:id', updateAd);
router.delete('/:id', deleteAd);

export default router;
