import { Request, Response, NextFunction } from "express";
import TodoService from "../services/todo.service.ts";

class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.todoService.getOne(id);
      res.json(result);
    } catch (e) {}
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = await this.todoService.create(data);
      res.json(result);
    } catch (e) {}
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await this.todoService.update(id, data);
      res.json(result);
    } catch (e) {}
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.todoService.delete(id);
      res.json(result);
    } catch (e) {}
  };
}

export default new TodoController();
