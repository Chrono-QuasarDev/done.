export class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority || "low";
    this.completed = false;
    this.checklist = [];
    this.notes = "";
  }

  setComplete() {
    this.completed = true;
  }

  addChecklist(text) {
    this.checklist.push({text: text, checked: false});
  }

  toggleChecked(text) {
    const item = this.checklist.find(item => item.text === text);
    if (item) {
      item.checked = !item.checked;
    }
  }
}