import { Router } from 'express'
import { showApplications, showApplication, createApplication, updateApplication, deleteApplication } from '../controllers/applicationTracker'

const router = Router()

//Fetch * users applications
router.get('/applications/:user_id', showApplications)
//Fetch a users application by appID
router.get('/applications/:user_id/:application_id', showApplication)

//Create application record
router.post('/applications', createApplication)

//Update applicaton record
router.put('/applications/:user_id/:application_id', updateApplication)

//Delete application record
router.delete('/applications/:application_id', deleteApplication)

export default router;