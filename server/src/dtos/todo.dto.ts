export default class TodoDTO {
  name: string;
  description: string;
  priority: number;
  date?: Date;

  constructor(data: any) {
    ({
      name: this.name,
      description: this.description,
      priority: this.priority,
      date: this.date,
    } = data);
  }
}
