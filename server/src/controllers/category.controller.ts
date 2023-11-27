import { Request, Response, NextFunction } from "express";
import CategoryService from "../services/category.service.ts";

class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.categoryService.getOne(id);
      res.json(result);
    } catch (e) {}
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const data = req.body;
      const result = await this.categoryService.create(projectId, {
        ...data,
        project: projectId,
      });
      res.json(result);
    } catch (e) {}
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await this.categoryService.update(id, data);
      res.json(result);
    } catch (e) {}
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.categoryService.delete(id);
      res.json(result);
    } catch (e) {}
  };
}

export default new CategoryController();
