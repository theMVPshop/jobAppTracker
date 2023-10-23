import { Router } from 'express'
import { createApplication, getUserApplications, updateApplication, deleteApplication } from '../controllers/applications.js'

const router = Router()

router.get('/users/:user_id/applications', getUserApplications);
router.post('/users/:user_id/applications', createApplication);
router.put('/users/:user_id/applications/:id', updateApplication);
router.delete('/users/:user_id/applications/:id', deleteApplication);

export default router;