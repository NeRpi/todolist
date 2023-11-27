import $api from "../http/index";

export default class TodoService {
  static async getAll() {
    return $api.get("/projects");
  }

  static async getUpcoming() {
    return $api.get("/todos/upcoming");
  }

  static async getTodos() {
    return $api.get("/todos");
  }

  static async createTodo(categoryId, data) {
    return $api.post(`/todos/${categoryId}`, data);
  }

  static async updateTodo(data) {
    return $api.put(`/todos/${data.id}`, data);
  }

  static async deleteTodo(id) {
    return $api.delete(`/todos//${id}`);
  }

  static async createCategory(projectId, data) {
    return $api.post(`/categories/${projectId}`, data);
  }

  static async updateCategory(data) {
    return $api.put(`/categories/${data.id}`, data);
  }

  static async deleteCategory(id) {
    return $api.delete(`/categories/${id}`);
  }

  static async createProject(data) {
    return $api.post("/projects/", data);
  }

  static async getProject(id) {
    return $api.get(`/projects/${id}`);
  }

  static async updateProject(data) {
    return $api.put(`/projects/${data.id}`, data);
  }

  static async deleteProject(id) {
    return $api.delete(`/projects/${id}`);
  }
}
