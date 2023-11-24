export default class UserDTO {
  username: string;
  password: string;
  todos: string;

  constructor(data: any) {
    ({
      username: this.username,
      password: this.password,
      todos: this.todos,
    } = data);
  }
}
