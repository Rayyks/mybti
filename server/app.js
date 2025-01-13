import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import "./jobs/deleteScheduledAccounts.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import postActionRoutes from "./routes/postActionRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Initialize the app
const app = express();

// Load environment variables
dotenv.config();

// Middleware setup
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan("dev"));

// Serve static files with CORS headers
app.use(
  "/api/uploads",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static("uploads")
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/action", postActionRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/user", userRoutes);

// Authentication middleware
app.use(authMiddleware);

// TEST THE API
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use((req, res, next) => {
  res.status(404).send("Route not found");
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

export default app;
