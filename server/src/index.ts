import express from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env";
import authRouter from "./routes/auth";
import protectedRouter from "./routes/protected";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRouter);
app.use("/api", protectedRouter);

app.listen(env.port, () => {
  console.log(`server listening on http://localhost:${env.port}`);
});
