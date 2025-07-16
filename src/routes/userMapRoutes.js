import express from 'express';
import {
  createUserMap,
  getAllUserMaps,
  getUserMapById,
  updateUserMap,
  deleteUserMap
} from '../controllers/userMapController.js';

const router = express.Router();

router.post('/', createUserMap);
router.get('/', getAllUserMaps);
router.get('/:id', getUserMapById);
router.put('/:id', updateUserMap);
router.delete('/:id', deleteUserMap);

export default router;
