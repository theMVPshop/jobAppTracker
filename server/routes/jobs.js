import { Router } from 'express'
import { createApplication, getUserApplications, updateApplication, deleteApplication } from '../controllers/jobs.js'

const router = Router()

router.post('/users/:user_id/applications', createApplication);
router.get('/users/:user_id/applications', getUserApplications);
router.put('/users/:user_id/applications/:application_id', updateApplication);
router.delete('/users/:user_id/applications/:application_id', deleteApplication);

export default router;