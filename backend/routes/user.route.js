import express from "express";
const router = express.Router();
import { test, user,signOut } from "../controllers/user.controller.js";
router.get("/test", test);
router.get("/user", user);
// router.put("/update/:userId", verifyUser, updateUser);

router.post("/signout",signOut);


export default router;
