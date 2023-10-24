import { Router } from 'express';
import { categorizeText } from '../controllers/openaiJobTrack.js';
const router = Router()

router.post('/', categorizeText)

export default router;