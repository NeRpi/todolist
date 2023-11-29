import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service.ts";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.userService.getOne(id);
      res.json(result);
    } catch (e) {
      next(e);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = await this.userService.create(data);
      res.json(result);
    } catch (e) {
      next(e);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await this.userService.update(id, data);
      res.json(result);
    } catch (e) {
      next(e);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.userService.delete(id);
      res.json(result);
    } catch (e) {
      next(e);
    }
  };
}

export default new UserController();
