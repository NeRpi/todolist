import { Types } from "mongoose";

export default interface ICategory {
  name: string;
  todos: Types.ObjectId[];
}
