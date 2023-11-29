import Category from "../db/models/category.model.ts";
import Todo from "../db/models/todo.model.ts";
import User from "../db/models/user.model.ts";
import TodoDTO from "../dtos/todo.dto.ts";
import ApiError from "../error/api.error.ts";
import ITodo from "../db/interfaces/ITodo.interface.ts";

export default class TodoRepository {
  constructor() {}

  public async getAll(userId: string) {
    try {
      return await User.findById(userId).populate({ path: "todos" });
    } catch (e) {
      console.log("Can't get todos");
    }
  }

  public async getUpcoming(userId: string) {
    try {
      const user = await User.findById(userId);
      if (!user) throw ApiError.forbidden("Invalid user id");

      const todosPromises = user?.todos.map(async (todoId) => {
        const todo = await Todo.findById(todoId);
        if (todo?.category) {
          const category = await Category.findById(todo.category);
          if (category && category.project) todo.project = category.project;
        }
        return todo;
      });

      const todosWithDate = (await Promise.all(todosPromises)).filter(
        (todo) => todo?.date
      );
      const groupedTodos = todosWithDate.reduce((acc, todo) => {
        const dateKey = todo!.date!.toISOString().split("T")[0];
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(todo!);
        return acc;
      }, {} as Record<string, ITodo[]>);

      const sortedKeys = Object.keys(groupedTodos).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
      );
      const sortedGroupedTodos: Record<string, ITodo[]> = {};
      sortedKeys.forEach((key) => {
        sortedGroupedTodos[key] = groupedTodos[key];
      });

      return sortedGroupedTodos;
    } catch (e) {
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
