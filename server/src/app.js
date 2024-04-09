import express from 'express';
import userRoutes from "./routes/users.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import cookieParser from 'cookie-parser';
import cors from "cors";

const app = express();
// Middlewares
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173' 
    }));
app.use(express.json());
app.use(cookieParser());

app.use(userRoutes);
app.use(paymentRoutes);

export default app;