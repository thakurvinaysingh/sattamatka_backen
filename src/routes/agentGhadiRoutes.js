import express from 'express';
import {
  getAgentGhadis,
  getAgentGhadiResults,
  agentUpdateResult
} from '../controllers/agentGhadiController.js';
import {protect, requireRole } from '../middleware/auth.js';

const router = express.Router();
router.use(protect); 

// All endpoints require 'agent' role (enforced by middleware)
router.get('/my-ghadi', requireRole('agent'), getAgentGhadis);
// GET /api/agent/my-ghadi

router.get('/my-ghadi/results', requireRole('agent'), getAgentGhadiResults);
// GET /api/agent/my-ghadi/results?ghadiId=1

router.post('/my-ghadi/update-result', requireRole('agent'), agentUpdateResult);
// POST /api/agent/my-ghadi/update-result

export default router;
