import { Router } from 'express';
const router = Router()
import { categorizeText } from '../controllers/openaiJobTrack.js';

router.post('/', categorizeText)

export default router;