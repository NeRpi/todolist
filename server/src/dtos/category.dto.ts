export default class CategoryDTO {
  id: string;
  name: string;
  todos: string[];
  project: string;

  constructor(data: any) {
    ({
      id: this.id,
      name: this.name,
      todos: this.todos,
      project: this.project,
    } = data);
  }
}
