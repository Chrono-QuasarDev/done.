export class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
    this.color = "";
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(title) {
    this.todos = this.todos.filter(items => items.title !== title);
  }

  retrieveTodo(title) {
    return this.todos.find(items => items.title === title);
  }
}