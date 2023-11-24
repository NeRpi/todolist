import express, { Express, Request, Response } from "express";
import cors from "cors";
import "dotenv";

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hi!");
});

app.listen(port, () => {
  console.log(`Server is running ad localhost:${port}`);
});
