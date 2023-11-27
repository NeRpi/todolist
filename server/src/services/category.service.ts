import CategoryDTO from "../dtos/category.dto.ts";
import CategoryRepository from "../repositories/categart.repo.ts";

export default class CategoryService {
  private categoryRepo: CategoryRepository;

  constructor() {
    this.categoryRepo = new CategoryRepository();
  }

  public async getOne(categoryId: string) {
    return await this.categoryRepo.getById(categoryId);
  }

  public async create(projectId: string, data: any) {
    return await this.categoryRepo.create(projectId, data);
  }

  public async update(categoryId: string, data: any) {
    const projectDTO = new CategoryDTO(data);
    return await this.categoryRepo.updateById(categoryId, projectDTO);
  }

  public async delete(categoryId: string) {
    return await this.categoryRepo.deleteById(categoryId);
  }
}
