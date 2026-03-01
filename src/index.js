import { Todo } from "./modules/todo";

const todoList = new Todo("Shopping", "Buy groceries from the mall nearby", "Tommorow", "high");
const todoList2 = new Todo("Shopping", "Buy groceries from the mall nearby", "Tommorow", "high");

todoList2.setComplete();
console.log(todoList);
console.log(todoList2);