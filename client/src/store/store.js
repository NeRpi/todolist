import { makeAutoObservable } from "mobx";
import TodoService from "../services/TodoService";

const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export default class Store {
  isAuth = false;
  todoList = [];
  daylyList = {};
  upcomingList = {};
  incomingList = {};
  projectList = {};
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  async getTodos() {
    TodoService.getTodos().then((response) => {
      this.todoList = response.data;
      this.setTodos();
    });
  }

  setTodos() {
    this.daylyList = {};
    this.upcomingList = {};
    this.incomingList = {};
    this.projectList = {};
    this.todoList.forEach((todo) => {
      if (todo.date) {
        const todoDate = new Date(todo.date);
        const date = `${todoDate.getDate()} ${
          monthNames[todoDate.getMonth()]
        } ${todoDate.getFullYear()}
        `;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (todoDate < today) {
          if (this.upcomingList["Просрочено"])
            this.upcomingList["Просрочено"].push(todo);
          else this.upcomingList["Просрочено"] = [todo];
          if (this.daylyList["Просрочено"])
            this.daylyList["Просрочено"].push(todo);
          else this.daylyList["Просрочено"] = [todo];
        } else if (todoDate.toDateString() === today.toDateString()) {
          if (this.upcomingList[date]) this.upcomingList[date].push(todo);
          else this.upcomingList[date] = [todo];
          if (this.daylyList[date]) this.daylyList[date].push(todo);
          else this.daylyList[date] = [todo];
        } else {
          if (this.upcomingList[date]) this.upcomingList[date].push(todo);
          else this.upcomingList[date] = [todo];
        }
      }
      if (todo.project && todo.project !== "") {
        if (this.projectList[todo.project])
          this.projectList[todo.project].push(todo);
        else this.projectList[todo.project] = [todo];
      } else {
        if (this.incomingList[todo.priority])
          this.incomingList[todo.priority].push(todo);
        else this.incomingList[todo.priority] = [todo];
      }
    });
  }

  async createTodo(todo) {
    await TodoService.createTodo(todo);
  }

  async updateTodo(todo) {
    await TodoService.updateTodo(todo);
  }

  async deleteTodo(todoId) {
    await TodoService.deleteTodo(todoId);
  }

  async updateCategory(category) {
    await TodoService.updateCategory(category);
  }

  async deleteCategory(category) {
    await TodoService.deleteCategory(category);
  }

  async updateProject(project) {
    await TodoService.updateProject(project);
  }

  async deleteProject(project) {
    await TodoService.deleteProject(project);
  }
}
