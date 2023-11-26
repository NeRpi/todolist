import $api from "../http/index";

export default class TodoService {
  static async getTodos() {
    return $api.get("/todo/65622544fb93514574206cde");
  }

  static async createTodo(data) {
    return $api.post("/todo/65622544fb93514574206cde", data);
  }

  static async updateTodo(data) {
    return $api.put(`/todo/65622544fb93514574206cde/${data.id}`, data);
  }

  static async deleteTodo(id) {
    console.log(id);
    return $api.delete(`/todo/65622544fb93514574206cde/${id}`);
  }

  static async updateCategory(data) {
    return $api.put("/todo/65622544fb93514574206cde/category", data);
  }

  static async deleteCategory(data) {
    return $api.delete("/todo/65622544fb93514574206cde/category", data);
  }

  static async updateProject(data) {
    return $api.put("/todo/65622544fb93514574206cde/project", data);
  }

  static async deleteProject(data) {
    return $api.delete("/todo/65622544fb93514574206cde/project", data);
  }
}
