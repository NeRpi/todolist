import { Schema, model } from "mongoose";
import ICategory from "../interfaces/ICategory.interface.ts";

let categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  todos: [{ type: Schema.ObjectId, ref: "Todos" }],
});

export default model<ICategory>("Categories", categorySchema);
