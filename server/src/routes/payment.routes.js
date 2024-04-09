import { Router } from "express";
import { 
    createPayment,
    editPaymentEntry,
    deletePayment,
    getPayment
 } from "../controllers/payments.controllers.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/payment", requireAuth, createPayment);
router.get("/payment/:id", getPayment)
router.put("/payment/:id", editPaymentEntry);
router.delete("/payment/:id", deletePayment)

export default router;