const express = require('express')
const router = express.Router()
const openAiControllers = require('../controllers/openai')

router.post('/categorize', openAiControllers.categorizeText)

module.exports = router;