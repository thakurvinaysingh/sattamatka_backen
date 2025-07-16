import express from 'express';
import {
  createUser, getAllUsers, getUserById, updateUser, deleteUser,loginUser,countAgents
} from '../controllers/userController.js';


const router = express.Router();
router.get('/count', countAgents);
router.post('/login', loginUser);
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);



export default router;
