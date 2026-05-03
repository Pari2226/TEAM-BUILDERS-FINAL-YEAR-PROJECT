const express = require("express");
const cors = require("cors");
const { clerkMiddleware } = require("@clerk/express");
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
const userRoutes = require("./routes/userRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://team-builders.netlify.app",
];

app.use(
  clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  }),
);
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "team-builders-server" });
});

app.use("/api/auth", authRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/users", userRoutes);
app.use("/api", recommendationRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
