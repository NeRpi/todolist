import { Request, Response, NextFunction } from "express";
import TodoService from "../services/todo.service.ts";

class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.todoService.getAll(req.user.id);
      res.json(result);
    } catch (e) {
      next();
    }
  };

  getUpcoming = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.todoService.getUpcoming(req.user.id);
      res.json(result);
    } catch (e) {
      next();
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.todoService.getOne(id);
      res.json(result);
    } catch (e) {
      next();
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { categoryId } = req.params;
      const data = req.body;
      const result = await this.todoService.create(req.user.id, categoryId, {
        ...data,
        category: categoryId,
      });
      res.json(result);
    } catch (e) {
      next();
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await this.todoService.update(id, data);
      res.json(result);
    } catch (e) {
      next();
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.todoService.delete(id);
      res.json(result);
    } catch (e) {
      next();
    }
  };
}

export default new TodoController();
