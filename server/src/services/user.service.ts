import UserDTO from "../dtos/user.dto.ts";
import UserRepository from "../repositories/user.repo.ts";

export default class UserService {
  private userRepo = new UserRepository();

  constructor() {
    this.userRepo = new UserRepository();
  }

  public async getOne(id: string) {
    return await this.userRepo.getById(id);
  }

  public async create(data: any) {
    const userDTO = new UserDTO(data);
    return await this.userRepo.create(userDTO);
  }

  public async update(id: string, data: any) {
    const userDTO = new UserDTO(data);
    return await this.userRepo.updateById(id, userDTO);
  }

  public async delete(id: string) {
    return await this.userRepo.deleteById(id);
  }
}
