import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import { PORT, FRONTEND_URL } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Student Management System Backend Working!",
  });
});

app.use(errorMiddleware);

app.listen(PORT, async () => {
  try {
    await connectToDatabase();
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
});

export default app;
