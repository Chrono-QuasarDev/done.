import { Todo } from "./modules/todo";
import { Project } from "./modules/project";
import { storeTodo, getStoredItem, removeItem, clearStorage } from "./modules/storage";

const todoList = new Todo("Shopping", "Buy groceries from the mall nearby", "Tommorow", "high");
const todoList2 = new Todo("Shopping2", "Buy groceries from the mall nearby", "Tommorow", "high");
todoList2.setComplete();

const project = new Project("Getting Started");
project.addTodo(todoList);
project.addTodo(todoList2);

console.log(todoList);
console.log(todoList2);
console.log(project);

console.log(project.retrieveTodo("Shopping2"));

storeTodo(project);
console.log(getStoredItem())