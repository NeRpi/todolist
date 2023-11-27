import { Router } from "express";
import projectController from "../controllers/project.controller.ts";

const router = Router();

router.get("/", projectController.getAll);
router.get("/:id", projectController.getOne);
router.post("/", projectController.create);
router.put("/:id", projectController.update);
router.delete("/:id", projectController.delete);

export default router;
