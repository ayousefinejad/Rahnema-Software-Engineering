import { Router } from "express";
import { signUpController, loginController } from "./auth.controller";


const router = Router();

router.post("/signup", signUpController);
router.post("/login", loginController);

export default router;
