import ProjectDTO from "../dtos/project.dto.ts";
import ProjectRepository from "../repositories/project.repo.ts";

export default class ProjectService {
  private projectRepo: ProjectRepository;

  constructor() {
    this.projectRepo = new ProjectRepository();
  }

  public async getAll(userId: string) {
    return await this.projectRepo.getAll(userId);
  }

  public async getOne(projectId: string) {
    return await this.projectRepo.getById(projectId);
  }

  public async create(userId: string, data: any) {
    return await this.projectRepo.create(userId, data);
  }

  public async update(projectId: string, data: any) {
    const projectDTO = new ProjectDTO(data);
    return await this.projectRepo.updateById(projectId, projectDTO);
  }

  public async delete(projectId: string) {
    return await this.projectRepo.deleteById(projectId);
  }
}
