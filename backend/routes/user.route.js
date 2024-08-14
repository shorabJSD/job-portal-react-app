import express from 'express';
import { Logout, NewUserRegistration, UpdateProfile, UserLogin } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
const router = express.Router();


router.route("/register").post(NewUserRegistration);
router.route("/login").post(UserLogin);
router.route("/logout").post(Logout);
router.route("/profile/update/:id").put(isAuthenticated, UpdateProfile);

export default router;