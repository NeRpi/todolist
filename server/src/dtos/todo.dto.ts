export default class TodoDTO {
  name: string;
  description: string;
  priority: number;
  date?: Date;
  category: string;

  constructor(data: any) {
    ({
      name: this.name,
      description: this.description,
      priority: this.priority,
      date: this.date,
      category: this.category,
    } = data);
  }
}
