import {Router} from 'express';
import { createPayslip, getPayslips, getPayslipsById } from '../controllers/payslipController.js';
import { protect, protectAdmin } from '../middleware/auth.js';

const payslipRouter = Router();

payslipRouter.post("/", protect, protectAdmin, createPayslip);
payslipRouter.get("/", protect, getPayslips);
payslipRouter.get("/:id", protect, getPayslipsById);


export default payslipRouter;