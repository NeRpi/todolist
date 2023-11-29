import { Request, Response, NextFunction } from "express";
import ProjectService from "../services/project.service.ts";

class ProjectController {
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.projectService.getAll(req.user.id);
      res.json(result);
    } catch (e) {
      next();
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.projectService.getOne(id);
      res.json(result);
    } catch (e) {
      next();
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = await this.projectService.create(req.user.id, data);
      res.json(result);
    } catch (e) {
      next();
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await this.projectService.update(id, data);
      res.json(result);
    } catch (e) {
      next();
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.projectService.delete(id);
      res.json(result);
    } catch (e) {
      next();
    }
  };
}

export default new ProjectController();
