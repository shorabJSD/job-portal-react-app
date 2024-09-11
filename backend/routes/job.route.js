import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js';
import {  GetAdminJob, GetAllJobs, GetJobById, JobPost } from '../controllers/job.controller.js';
 
const router = express.Router();
 

router.route('/jobPost').post(isAuthenticated, JobPost)
router.route("/getAllJobs").get(isAuthenticated, GetAllJobs)
router.route("/getAdminJobs").get(isAuthenticated, GetAdminJob)
router.route("/getJob/:id").get(isAuthenticated, GetJobById)


export default router