import { Router } from 'express'
import { createApplication, getUserApplications, updateApplication, deleteApplication } from '../controllers/applicationTracker.js'

const router = Router()

// Fetch all applications for a user
router.get('/users/:user_id/applications', getUserApplications);

// Create application record
router.post('/users/:user_id/applications', createApplication);

// Update job application
router.put('/users/:user_id/applications/:application_id', updateApplication);

// Delete a job application
router.delete('/users/:user_id/applications/:application_id', deleteApplication);

export default router;