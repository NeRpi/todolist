import { Router } from "express";
import userRouter from "./user.router.ts";
import todoRouter from "./todo.router.ts";

const router = Router();

router.use("/user", userRouter);
router.use("/todo", todoRouter);

export default router;
