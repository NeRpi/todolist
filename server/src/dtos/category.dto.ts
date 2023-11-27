export default class CategoryDTO {
  id: string;
  name: string;
  todos: string[];

  constructor(data: any) {
    ({ id: this.id, name: this.name, todos: this.todos } = data);
  }
}
