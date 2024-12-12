const express = require('express');
const jobController= require('../controllers/jobControllers')
const router = express.Router();

router.get('/', (req,res)=>jobController.getWelcomeMessage(req,res,router));
router.get('/showjobs', jobController.listAllJobs);
router.post('/postjob', jobController.postJob);
router.post('/jobs/filter', jobController.filterJobs);
router.get('/jobs/calculate', jobController.calculateJobStats);
module.exports = router;