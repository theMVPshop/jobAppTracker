import { Router } from 'express';
const router = Router()
import { categorizeText } from '../controllers/openai';

router.post('/categorize', categorizeText)

export default router;