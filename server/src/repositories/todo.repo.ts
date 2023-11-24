import Todo from "../db/models/todo.model.ts";
import TodoDTO from "../dtos/todo.dto.ts";

export default class TodoRepository {
  constructor() {}

  public async getById(id: string) {
    try {
      return await Todo.findById(id);
    } catch (e) {
      console.log("Can't get todo");
    }
  }

  public async create(todoDTO: TodoDTO) {
    try {
      return await Todo.create(todoDTO);
    } catch (e) {
      console.log("Can't create todo");
    }
  }

  public async updateById(id: string, todoDTO: TodoDTO) {
    try {
      return await Todo.findByIdAndUpdate(id, todoDTO);
    } catch (e) {
      console.log("Can't update todo");
    }
  }

  public async deleteById(id: string) {
    try {
      return await Todo.findByIdAndDelete(id);
    } catch (e) {
      console.log("Can't delete todo");
    }
  }
}
