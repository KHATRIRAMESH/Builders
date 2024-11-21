import express from "express";
const router = express.Router();
import { test, user } from "../controllers/user.controller.js";
router.get("/test", test);
router.get("/user", user);

export default router;
