import Category from "../db/models/category.model.ts";
import Todo from "../db/models/todo.model.ts";
import User from "../db/models/user.model.ts";
import TodoDTO from "../dtos/todo.dto.ts";

export default class TodoRepository {
  constructor() {}

  public async getAll(userId: string) {
    try {
      return await User.findById(userId).populate({ path: "todos" });
    } catch (e) {
      console.error(e);
      console.log("Can't get todos");
    }
  }

  public async getById(todoId: string) {
    try {
      return await Todo.findById(todoId);
    } catch (e) {
      console.log("Can't get todo");
    }
  }

  public async create(userId: string, categoryId: string, todoDTO: TodoDTO) {
    try {
      const newTodo = new Todo(todoDTO);
      await Category.findByIdAndUpdate(
        categoryId,
        {
          $push: { todos: newTodo },
        },
        { new: true }
      );
      await newTodo.save();
      await User.findByIdAndUpdate(
        userId,
        {
          $push: { todos: newTodo },
        },
        { new: true }
      );
      await newTodo.save();
      return newTodo;
    } catch (e) {
      console.log("Can't create todo");
    }
  }

  public async updateById(todoId: string, todoDTO: TodoDTO) {
    try {
      return await Todo.findByIdAndUpdate(todoId, todoDTO);
    } catch (e) {
      console.log("Can't update todo");
    }
  }

  public async deleteById(todoId: string) {
    try {
      return await Todo.findByIdAndDelete(todoId);
    } catch (e) {
      console.log("Can't delete todo");
    }
  }
}
