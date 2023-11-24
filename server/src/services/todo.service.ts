import TodoDTO from "../dtos/todo.dto.ts";
import TodoRepository from "../repositories/todo.repo.ts";

export default class TodoService {
  private todoRepo = new TodoRepository();

  constructor() {
    this.todoRepo = new TodoRepository();
  }

  public async getOne(id: string) {
    return await this.todoRepo.getById(id);
  }

  public async create(data: any) {
    const todoDTO = new TodoDTO(data);
    return await this.todoRepo.create(todoDTO);
  }

  public async update(id: string, data: any) {
    const todoDTO = new TodoDTO(data);
    return await this.todoRepo.updateById(id, todoDTO);
  }

  public async delete(id: string) {
    return await this.todoRepo.deleteById(id);
  }
}
