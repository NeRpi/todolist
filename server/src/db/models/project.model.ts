import { Schema, model } from "mongoose";
import IProject from "../interfaces/IProject.inteface.ts";

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  categories: [{ type: Schema.ObjectId, ref: "Categories" }],
});

export default model<IProject>("Projects", projectSchema);
