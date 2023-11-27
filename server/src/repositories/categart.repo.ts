import Project from "../db/models/project.model.ts";
import Category from "../db/models/category.model.ts";
import CategoryDTO from "../dtos/category.dto.ts";

export default class CategoryRepository {
  public async getById(categoryId: string) {
    try {
      return await Category.findById(categoryId);
    } catch (e) {
      console.log("Can't get todo");
    }
  }

  public async create(projectId: string, categoryDTO: CategoryDTO) {
    try {
      const newCategory = new Category(categoryDTO);
      await Project.findByIdAndUpdate(
        projectId,
        {
          $push: { categories: newCategory },
        },
        { new: true }
      );
      await newCategory.save();
      return newCategory;
    } catch (e) {
      console.log("Can't create todo");
    }
  }

  public async updateById(categoryId: string, categoryDTO: CategoryDTO) {
    try {
      return await Category.findByIdAndUpdate(categoryId, categoryDTO);
    } catch (e) {
      console.error(e);
      console.log("Can't update todo");
    }
  }

  public async deleteById(categoryId: string) {
    try {
      return await Category.findByIdAndDelete(categoryId);
    } catch (e) {
      console.log("Can't delete todo");
    }
  }
}
