import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import routers from "./routes/index.ts";
import errorHandlingMiddleware from "./middleware/error.handling.middleware.ts";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.API_URL }));
app.use(express.json());
app.use("/api", routers);
app.use(errorHandlingMiddleware);

const start = async () => {
  mongoose.connect(process.env.DB_CONNECTION_STRING!);
  app.listen(port, () => {
    console.log(`Server is running ad localhost:${port}`);
  });
};

start();
