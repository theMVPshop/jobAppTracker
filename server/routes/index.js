import { Router } from 'express'
import applicationsRoute from './applicationTracker'
import openaiJobTrackRoutes from './openaiJobTrack'

const router = Router();

//Job Tracker CRUD Routes
router.get('/applications/:user_id', applicationsRoute)
router.get('/applications/:user_id/:application_id', applicationsRoute)
router.post('/applications', applicationsRoute)
router.put('/applications/:user_id/:application_id', applicationsRoute)
router.delete('/applications/:application_id', applicationsRoute)

//OpenAI Job Tracker Categorizer
router.post('/categorize', openaiJobTrackRoutes)
export default router