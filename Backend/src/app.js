import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoute from "./routes/auth.routes.js";
import taskRoute from "./routes/task.routes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);
app.use(express.static(path.join(__dirname, "../../Frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Frontend/index.html"));
});

export default app;