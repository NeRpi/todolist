import { Types } from "mongoose";

export default interface ITodo {
  name: string;
  description: string;
  priority: number;
  date?: Date;
  project?: Types.ObjectId;
  category?: Types.ObjectId;
}
