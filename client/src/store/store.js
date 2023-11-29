import { makeAutoObservable, runInAction } from "mobx";
import TodoService from "../services/TodoService";
import AuthService from "../services/AuthService";
import axios from "axios";
import _ from "lodash";
import { API_URL } from "../http";

export default class Store {
  isAuth = false;
  projectList = [];
  updcomingList = {};

  constructor() {
    makeAutoObservable(this);
  }

  async registration(username, password) {
    try {
      const response = await AuthService.registration(
        username.trim(),
        password.trim()
      );
      localStorage.setItem("token", response.data.accessToken);
      this.isAuth = true;
    } catch (e) {
      console.log(e.response.data.message);
    }
  }

  async login(username, password) {
    try {
      const response = await AuthService.login(
        username.trim(),
        password.trim()
      );
      localStorage.setItem("token", response.data.accessToken);
      this.isAuth = true;
    } catch (e) {
      console.log(e.response.data.message);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      this.isAuth = false;
    } catch (e) {
      console.log(e.response.data.message);
    }
  }

  async checkAuth() {
    try {
      const response = await axios.post(
        `${API_URL}/auth/refresh`,
        {},
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("token", response.data.accessToken);
      this.isAuth = true;
    } catch (e) {}
  }

  async getTodos() {
    TodoService.getAll().then((response) => {
      runInAction(() => {
        if (!_.isEqual(this.projectList, response.data.projects))
          this.projectList = response.data.projects;
      });
    });
  }

  async getUpcoming() {
    TodoService.getUpcoming().then((response) => {
      runInAction(() => {
        if (!_.isEqual(this.updcomingList, response.data))
          this.updcomingList = response.data;
      });
    });
  }

  async createTodo(categoryId, todo) {
    try {
      const response = await TodoService.createTodo(categoryId, todo);
      this.getTodos();
      this.getUpcoming();
      return response;
    } catch (e) {}
  }

  async updateTodo(todo) {
    try {
      const response = await TodoService.updateTodo(todo);
      this.getTodos();
      this.getUpcoming();
      return response;
    } catch (e) {}
  }

  async deleteTodo(todoId) {
    try {
      const response = await TodoService.deleteTodo(todoId);
      this.getTodos();
      this.getUpcoming();
      return response;
    } catch (e) {}
  }

  async updateCategory(category) {
    try {
      const response = await TodoService.updateCategory(category);
      this.getTodos();
      this.getUpcoming();
      return response;
    } catch (e) {}
  }

  async createCategory(projectId, data) {
    try {
      const response = await TodoService.createCategory(projectId, data);
      this.getTodos();
      this.getUpcoming();
      return response;
    } catch (e) {}
  }

  async deleteCategory(id) {
    try {
      const response = await TodoService.deleteCategory(id);
      this.getTodos();
      this.getUpcoming();
      return response;
    } catch (e) {}
  }

  async getProject(id) {
    try {
      const response = await TodoService.getProject(id);
      this.getTodos();
      this.getUpcoming();
      return response;
    } catch (e) {}
  }

  async createProject(data) {
    try {
      const response = await TodoService.createProject(data);
      this.getTodos();
      this.getUpcoming();
      return response;
    } catch (e) {}
  }

  async updateProject(project) {
    try {
      const response = await TodoService.updateProject(project);
      this.getTodos();
      this.getUpcoming();
      return response;
    } catch (e) {}
  }

  async deleteProject(project) {
    try {
      const response = await TodoService.deleteProject(project);
      this.getTodos();
      this.getUpcoming();
      return response;
    } catch (e) {}
  }
}
