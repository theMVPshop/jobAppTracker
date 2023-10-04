import { Router } from 'express'
import applicationsRoute from './applicationTracker'

const router = Router()

router.get('/applications/:user_id', applicationsRoute)
router.get('/applications/:user_id/:application_id', applicationsRoute)

router.post('/applications', applicationsRoute)

router.put('/applications/:user_id/:application_id', applicationsRoute)

router.delete('/applications/:application_id', applicationsRoute)

export default router