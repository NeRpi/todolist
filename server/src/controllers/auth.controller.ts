import AuthService from "../services/auth.service.ts";
import { Request, Response, NextFunction } from "express";

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  registration = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const userData = await this.authService.registration(username, password);
      res.cookie("refreshToken", userData.refreshToken, { httpOnly: true });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const userData = await this.authService.login(username, password);
      res.cookie("refreshToken", userData.refreshToken, { httpOnly: true });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("refreshToken");
      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  };

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;
      const userData = await this.authService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, { httpOnly: true });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  };
}

export default new AuthController();
