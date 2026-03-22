export class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority || "low";
    this.completed = false;
  }

  setComplete() {
    if (!this.completed) {
      this.completed = true;
    } else {
      this.completed = false;
    }
  }
}