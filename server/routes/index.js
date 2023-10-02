const express = require('express')
const router = express.Router()
const applicationsRoute = require('./applicationTracker')

router.get('/applications/:user_id', applicationsRoute)
router.get('/applications/:user_id/:application_id', applicationsRoute)

router.post('/applications', applicationsRoute)

router.put('/applications/:user_id/:application_id', applicationsRoute)

router.delete('/applications/:application_id', applicationsRoute)
module.exports = router