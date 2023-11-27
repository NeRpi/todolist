import { Types } from "mongoose";

export default interface IUser {
  username: string;
  password: string;
  projects: Types.ObjectId[];
  todos: Types.ObjectId[];
}
