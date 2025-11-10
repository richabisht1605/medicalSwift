import express from "express";
import { registerUser } from "../controllers/userController";
import { registerSchema } from "../validations/userValidations";
import { validateRequest } from "../middlewares/validateRequest";

const router = express.Router();
router.post("/register", validateRequest(registerSchema), registerUser);

export default router;