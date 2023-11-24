import { Router } from "express";
import todoController from "../controllers/todo.controller.ts";

const router = Router();

router.get("/:id", todoController.getOne);
router.post("/", todoController.create);
router.put("/:id", todoController.update);
router.delete("/:id", todoController.delete);

export default router;
