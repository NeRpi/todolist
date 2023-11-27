import ApiError from "../error/api.error.ts";
import TokenService from "./token.service.ts";
import { BcryptUtil } from "../utils/bcrypt.util.ts";
import UserDTO from "../dtos/user.dto.ts";
import UserRepository from "../repositories/user.repo.ts";

export default class AuthService {
  private tokenService;
  private userRepo;

  constructor() {
    this.tokenService = new TokenService();
    this.userRepo = new UserRepository();
  }

  async registration(username: string, password: string) {
    if (await this.userRepo.getByUsername(username))
      throw ApiError.internal("The mail is already registered");
    const hashPassword = await BcryptUtil.hash(password);
    const userDto = new UserDTO({ username, password: hashPassword });
    const user = await this.userRepo.create(userDto);
    return this.generateToken(new UserDTO(user));
  }

  async login(username: string, password: string) {
    const user = await this.userRepo.getByUsername(username);
    if (!user) throw ApiError.internal("The user is not registered");
    const isPassEquals = await BcryptUtil.compare(password, user.password);
    if (!isPassEquals) throw ApiError.badRequest("Invalid email or password");
    const userDto = new UserDTO(user);
    return this.generateToken(userDto);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) throw ApiError.unauthorized("The user is not logged in");
    const userData = this.tokenService.validateRefreshToken(refreshToken);
    if (!userData) throw ApiError.unauthorized("The user is not logged in");
    const user = await this.userRepo.getById(userData.userId);
    const userDto = new UserDTO(user);
    return this.generateToken(userDto);
  }

  generateToken(userDto: UserDTO) {
    const payload = { userId: userDto.id };
    const tokens = this.tokenService.generateTokens(payload);
    return { ...tokens, user: payload };
  }
}
