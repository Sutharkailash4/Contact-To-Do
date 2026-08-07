import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoute from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
    res.json({
        message : "Server is running"
    });
});

export default app;