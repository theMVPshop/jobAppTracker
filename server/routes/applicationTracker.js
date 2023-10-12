import { Router } from 'express'
import { createApplication, getUserApplications, updateApplication } from '../controllers/applicationTracker.js'

const router = Router()

// Fetch all applications for a user
router.get('/users/:user_id/applications', getUserApplications);

// Create application record
router.post('/users/:user_id/applications', createApplication);

// Update job application
router.put('/users/:user_id/applications/:application_id', updateApplication);

export default router;

// //Update applicaton record
// router.put('/applications/:user_id/:application_id', updateApplication)

// //Delete application record
// router.delete('/applications/:application_id', deleteApplication)

// //Fetch a users application by appID
// router.get('/applications/:user_id/:application_id', showApplication)