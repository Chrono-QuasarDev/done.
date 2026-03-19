import { Project } from "./project";
import { Todo } from "./todo";

export function storeProjects(allProjects) {
  localStorage.setItem("projects", JSON.stringify(allProjects));
}

export function getStoredProjects() {
  const data = localStorage.getItem("projects");
  if (!data) return [];
  const parsed = JSON.parse(data);
  if (!Array.isArray(parsed)) return [];

  return parsed.map(projectData => {
    const project = new Project(projectData.name, projectData.color);
    projectData.todos.forEach(todoData => {
      const todo = new Todo(
        todoData.title,
        todoData.description,
        todoData.dueDate,
        todoData.priority
      );
      todo.completed = todoData.completed;
      todo.notes = todoData.notes;
      todo.checklist = todoData.checklist;
      project.addTodo(todo);
    });
    return project;
  });
}