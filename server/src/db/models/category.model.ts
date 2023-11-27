import { Schema, model } from "mongoose";
import ICategory from "../interfaces/ICategory.interface.ts";

let categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  todos: [{ type: Schema.ObjectId, ref: "Todos" }],
  project: { type: Schema.ObjectId, ref: "Projects" },
});

export default model<ICategory>("Categories", categorySchema);
