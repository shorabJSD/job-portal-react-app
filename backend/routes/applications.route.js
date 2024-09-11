import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { ApplyJob, getApplicants, GetAppliedJob, UpdateApplicatioin } from "../controllers/applications.controller.js"

const router = express.Router()
router.route("/apply/:id").get(isAuthenticated, ApplyJob)
router.route("/get").get(isAuthenticated, GetAppliedJob)
router.route("/applicants/:id").get(isAuthenticated, getApplicants)
router.route("/status/:id/update").get(isAuthenticated, UpdateApplicatioin)
export default router