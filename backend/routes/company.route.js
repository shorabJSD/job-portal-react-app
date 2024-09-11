import express from 'express';
import { GetCompany, GetCompanyById, RegisterCompany, UpdateCompany } from '../controllers/comapny.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
const router = express.Router();

router.route("/companyRegister").post(isAuthenticated, RegisterCompany);
router.route("/getCompany").get(isAuthenticated, GetCompany)
router.route("/getCompanyById/:id").get(isAuthenticated, GetCompanyById);
router.route("/update/:id").put(isAuthenticated, UpdateCompany)
export default router;