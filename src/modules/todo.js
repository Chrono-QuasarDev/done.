export class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority || "low";
    this.completed = false;
  }

  setComplete() {
    this.completed = !this.completed;
  }
}