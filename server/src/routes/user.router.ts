import { Router } from "express";
import userController from "../controllers/user.controller.ts";

const router = Router();

router.get("/:id", userController.getOne);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;
