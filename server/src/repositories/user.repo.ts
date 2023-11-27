import User from "../db/models/user.model.ts";
import UserDTO from "../dtos/user.dto.ts";

export default class UserRepository {
  public async getById(id: string) {
    try {
      return await User.findById(id);
    } catch (e) {
      console.log("Can't get user");
    }
  }

  public async getByUsername(username: string) {
    try {
      return await User.findOne({ username });
    } catch (e) {
      console.log("Can't delete user");
    }
  }

  public async create(userDTO: UserDTO) {
    try {
      return await User.create(userDTO);
    } catch (e) {
      console.log("Can't create user");
    }
  }

  public async updateById(id: string, userDTO: UserDTO) {
    try {
      return await User.findByIdAndUpdate(id, userDTO);
    } catch (e) {
      console.log("Can't update user");
    }
  }

  public async deleteById(id: string) {
    try {
      return await User.findByIdAndDelete(id);
    } catch (e) {
      console.log("Can't delete user");
    }
  }
}
