import express from "express";
import { register, login, logout, users } from "../controllers/auth_ctrl.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/users", users);

export default router;