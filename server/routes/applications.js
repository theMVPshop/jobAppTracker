import { Router } from 'express'
import { createApplication, getUserApplications, updateApplication, deleteApplication } from '../controllers/applications.js'

const router = Router();

router.post('/:user_id/applications', createApplication);
router.get('/:user_id/applications', getUserApplications);
router.put('/:user_id/applications/:id', updateApplication);
router.delete('/:user_id/applications/:id', deleteApplication);

export default router;