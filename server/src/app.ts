import express from "express";
import cors from "cors";
import mongoose from "mongoose";

export function createApp() {
  const app = express();

  const clientOrigin = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";
  app.use(
    cors({
      origin: clientOrigin,
    })
  );
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({
      ok: true,
      db: mongoose.connection.readyState === 1,
    });
  });

  return app;
}
