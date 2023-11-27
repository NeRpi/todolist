export default class ProjectDTO {
  id: string;
  name: string;
  categorys: string[];

  constructor(data: any) {
    ({ id: this.id, name: this.name, categorys: this.categorys } = data);
  }
}
