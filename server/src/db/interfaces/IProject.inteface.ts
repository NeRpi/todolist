import { Types } from "mongoose";

export default interface IProject {
  name: string;
  categories: Types.ObjectId[];
}
