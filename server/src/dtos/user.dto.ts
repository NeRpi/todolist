export default class UserDTO {
  id: string;
  username: string;
  password: string;
  projects: string[];

  constructor(data: any) {
    ({
      id: this.id,
      username: this.username,
      password: this.password,
      projects: this.projects,
    } = data);
  }
}
