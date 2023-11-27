import { Schema, model } from "mongoose";
import IUser from "../interfaces/IUser.interface.ts";

let userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  projects: [{ type: Schema.ObjectId, ref: "Projects" }],
  todos: [{ type: Schema.ObjectId, ref: "Todos" }],
});

export default model<IUser>("Users", userSchema);
