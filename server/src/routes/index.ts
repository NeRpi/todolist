import { Router } from "express";
import userRouter from "./user.router.ts";
import todoRouter from "./todo.router.ts";
import projectRouter from "./project.router.ts";
import categoryRouter from "./category.router.ts";
import authRouter from "./auth.router.ts";
import { jwtMiddleware } from "../middleware/jwt.middleware.ts";

const router = Router();

router.use("/user", jwtMiddleware, userRouter);
router.use("/projects", jwtMiddleware, projectRouter);
router.use("/categories", jwtMiddleware, categoryRouter);
router.use("/todos", jwtMiddleware, todoRouter);
router.use("/auth", authRouter);

export default router;
