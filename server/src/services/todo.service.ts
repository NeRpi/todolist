import TodoDTO from "../dtos/todo.dto.ts";
import TodoRepository from "../repositories/todo.repo.ts";

export default class TodoService {
  private todoRepo = new TodoRepository();

  constructor() {
    this.todoRepo = new TodoRepository();
  }

  public async getAll(userId: string) {
    return await this.todoRepo.getAll(userId);
  }

  public async getUpcoming(userId: string) {
    return await this.todoRepo.getUpcoming(userId);
  }

  public async getOne(todoId: string) {
    return await this.todoRepo.getById(todoId);
  }

  public async create(userId: string, categoryId: string, data: any) {
    const todoDTO = new TodoDTO(data);
    return await this.todoRepo.create(userId, categoryId, todoDTO);
  }

  public async update(todoId: string, data: any) {
    const todoDTO = new TodoDTO(data);
    return await this.todoRepo.updateById(todoId, todoDTO);
  }

  public async delete(todoId: string) {
    return await this.todoRepo.deleteById(todoId);
  }
}
