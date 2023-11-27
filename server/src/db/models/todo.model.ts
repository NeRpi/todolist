import { Schema, model } from "mongoose";
import ITodo from "../interfaces/ITodo.interface.ts";

let todoSchema = new Schema<ITodo>({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  priority: { type: Number, default: 4 },
  date: { type: Date },
  category: { type: Schema.ObjectId, ref: "Categories" },
  project: { type: Schema.ObjectId, ref: "Projects" },
});

export default model<ITodo>("Todos", todoSchema);
