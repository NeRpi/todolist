export default class TodoDTO {
  name: string;
  description: string;
  priority: number;
  date?: Date;
  oldCategory?: string;
  newCategory?: string;

  constructor(data: any) {
    ({
      name: this.name,
      description: this.description,
      priority: this.priority,
      date: this.date,
      oldCategory: this.oldCategory,
      newCategory: this.newCategory,
    } = data);
  }
}
