import express from 'express';
import {
  createAdMaster,
  getAllAdMasters,
  getAdMasterById,
  updateAdMaster,
  deleteAdMaster
} from '../controllers/adMasterController.js';

const router = express.Router();

router.post('/', createAdMaster);
router.get('/', getAllAdMasters);
router.get('/:id', getAdMasterById);
router.put('/:id', updateAdMaster);
router.delete('/:id', deleteAdMaster);

export default router;
