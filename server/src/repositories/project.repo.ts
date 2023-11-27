import User from "../db/models/user.model.ts";
import Project from "../db/models/project.model.ts";
import ProjectDTO from "../dtos/project.dto.ts";

export default class ProjectRepository {
  public async getAll(userId: string) {
    try {
      return await User.findById(userId).populate({
        path: "projects",
        populate: {
          path: "categories",
          populate: {
            path: "todos",
          },
        },
      });
    } catch (e) {
      console.error(e);
      console.log("Can't get todos");
    }
  }

  public async getById(projectId: string) {
    try {
      return await Project.findById(projectId).populate({
        path: "categories",
        populate: {
          path: "todos",
        },
      });
    } catch (e) {
      console.log("Can't get todo");
    }
  }

  public async create(userId: string, projectDTO: ProjectDTO) {
    try {
      const newProject = new Project(projectDTO);
      await User.findByIdAndUpdate(
        userId,
        {
          $push: { projects: newProject },
        },
        { new: true }
      );
      await newProject.save();
      return newProject;
    } catch (e) {
      console.log("Can't create todo");
    }
  }

  public async updateById(projectId: string, projectDTO: ProjectDTO) {
    try {
      return await Project.findByIdAndUpdate(projectId, projectDTO);
    } catch (e) {
      console.log("Can't update todo");
    }
  }

  public async deleteById(projectId: string) {
    try {
      return await Project.findByIdAndDelete(projectId);
    } catch (e) {
      console.log("Can't delete todo");
    }
  }
}
