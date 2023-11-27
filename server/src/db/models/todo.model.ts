import { Schema, model } from "mongoose";
import ITodo from "../interfaces/ITodo.interface.ts";

let todoSchema = new Schema<ITodo>({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  priority: { type: Number, default: 4 },
  date: { type: Date },
});

export default model<ITodo>("Todos", todoSchema);
