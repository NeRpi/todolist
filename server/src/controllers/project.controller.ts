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
    } catch (e) {}
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.projectService.getOne(id);
      res.json(result);
    } catch (e) {}
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = await this.projectService.create(req.user.id, data);
      res.json(result);
    } catch (e) {}
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await this.projectService.update(id, data);
      res.json(result);
    } catch (e) {}
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.projectService.delete(id);
      res.json(result);
    } catch (e) {}
  };
}

export default new ProjectController();
