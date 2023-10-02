const express = require('express')
const router = express.Router()
const applicationTrackerControllers = require('../controllers/applicationTracker')

//Fetch * users applications
router.get('/applications/:user_id', applicationTrackerControllers.showApplications)
//Fetch a users application by appID
router.get('/applications/:user_id/:application_id', applicationTrackerControllers.showApplication)

//Create application record
router.post('/applications', applicationTrackerControllers.createApplication)

//Update applicaton record
router.put('/applications/:user_id/:application_id', applicationTrackerControllers.updateApplication)

//Delete application record
router.delete('/applications/:application_id', applicationTrackerControllers.deleteApplication)


module.exports = router;