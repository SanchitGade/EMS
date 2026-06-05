import express from "express";
import cors from "cors";
import multer from "multer";
import "dotenv/config";
import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import authRouter from "./routes/authRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import attendanceRouter from "./routes/attendanceRoutes.js";
import leaveRouter from "./routes/leaveRoutes.js";
import payslipRouter from "./routes/payslipRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
//Inngest Imports
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();
const PORT = process.env.PORT || 4000;

//Middleware
app.use(cors());
app.use(express.json());
app.use(multer().none());

//Routes
app.get("/", (req, res) => res.send("Server is running"));

app.use("/api/auth", authRouter);
app.use("/api/employees", employeeRoutes);
app.use("/api/profile", profileRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/payslips", payslipRouter);
app.use("/api/dashboard", dashboardRouter);

// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

try {
  await connectDB();
} catch (error) {
  console.error("Failed to connect to database:", error);
  process.exit(1);
}

app.listen(PORT);

export default app;
