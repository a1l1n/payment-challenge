import { Router } from "express";
import {
   registerUser,
   postLoginUser,
   getAllUsers,
   logOut,
   generateExcel
} from "../controllers/users.controllers.js"
import { requireAuth } from "../middleware/authMiddleware.js";
import { getAllPayments } from "../controllers/users.controllers.js";

const router = Router();

router.post("/login", postLoginUser);
router.post("/register", registerUser);

router.get("/logout", logOut);
router.get('/allUsers', getAllUsers);

router.get("/user/:id/payments", requireAuth, getAllPayments);
router.get("/user/:id/excel", generateExcel)

export default router;