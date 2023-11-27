import { Router } from "express";
import categoryController from "../controllers/category.controller.ts";

const router = Router();

router.get("/:id", categoryController.getOne);
router.post("/:projectId", categoryController.create);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.delete);

export default router;
