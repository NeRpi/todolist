import { Types } from "mongoose";

export default interface IUser {
  username: string;
  password: string;
  todos: Types.ObjectId[];
}
