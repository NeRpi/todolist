import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import routers from "./routes/index.ts";

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", routers);

const start = async () => {
  mongoose.connect(process.env.DB_CONNECTION_STRING!);
  app.listen(port, () => {
    console.log(`Server is running ad localhost:${port}`);
  });
};

start();
