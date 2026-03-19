import { projects, activeProject, setActiveProject } from "../modules/state";
import { Project } from "../modules/project";
import { storeProjects } from "../modules/storage";
import { Todo } from "../modules/todo";

const contentArea = document.querySelector(".content-area");

// --------- DIALOG FUNCTIONS ------------
function closeModal(dialog) {
  dialog.classList.add("closing");
  dialog.addEventListener("animationend", () => {
    dialog.classList.remove("closing");
    dialog.close();
  }, { once: true });
}


// ----- PROJECT DIALOG ------
const projectDialog = document.getElementById("project-modal");
const wrapper = document.querySelector(".modal-wrapper");
const addProject = document.getElementById("add-project");
const cancel = document.getElementById("cancel");


addProject.addEventListener("click", () =>  projectDialog.showModal());

cancel.addEventListener("click", () => closeModal(projectDialog));

projectDialog.addEventListener("click", (event) => {
  if(!wrapper.contains(event.target)) {
    closeModal(projectDialog);
  }
});


export function renderProject(project) {
  const projectLists = document.querySelector(".project-lists");
  const projectLi = document.createElement("li");
  projectLi.innerHTML = `
  <span class="project-dot" style="background-color: ${project.color}"></span>
  ${project.name}`;

  projectLi.addEventListener("click", () => {
    setActiveProject(project);
    const headerTitle = document.querySelector(".personal");
    headerTitle.textContent = project.name;
    renderTodos(project)
  });
  projectLists.append(projectLi);
}


// ----- TODO MODAL -----
const todoDialog = document.getElementById("todo-modal");
const todoWrapper = document.getElementById("todo-wrapper");
const addTodo = document.getElementById("add-todo");
const cancelTodo = document.querySelectorAll(".cancel-todo");


addTodo.addEventListener("click", () => todoDialog.showModal());

cancelTodo.forEach(todo => {
  todo.addEventListener("click", () => closeModal(todoDialog));
})

todoDialog.addEventListener("click", (event) => {
  if (!todoWrapper.contains(event.target)) {
    closeModal(todoDialog);
  }
});


const createProject = document.getElementById("create-project");
const projectName = document.getElementById("name");
const pallete = document.querySelectorAll(".pallete");
let colorValue = "blue";
let project = null;

pallete.forEach(div => {
  div.addEventListener("click", () => {
    colorValue = div.dataset.color;
    console.log(colorValue);
  })
})

createProject.addEventListener("click", () => {
  const data = projectName.value;
  project = new Project(data, colorValue);
  projects.push(project);

  renderProject(project);

  storeProjects(projects);
  closeModal(projectDialog);
  projectName.value = "";
});


const saveTodo = document.querySelector(".save-todo");
const todoInput = document.getElementById("todo-input");
const todoDescription = document.getElementById("description");
const dueDate = document.getElementById("due-date");
const priority = document.getElementById("priority");
const status = document.getElementById("status");
const todoForm = document.querySelector(".todo-form");

saveTodo.addEventListener("click", (event) => {
  event.preventDefault();
  const inputData = todoInput.value;
  const descriptionData = todoDescription.value;
  const dateString = dueDate.value;
  const priorityData = priority.value;
  const statusData = status.value;

  const todo = new Todo(inputData, descriptionData, dateString, priorityData);
  activeProject.addTodo(todo);
  storeProjects(projects);
  renderTodos(activeProject);
  closeModal(todoDialog);
  todoForm.reset();
});


export function renderTodos(project) {
  contentArea.innerHTML = '';
  project.todos.forEach(todo => {
    const card = document.createElement("div");
    card.classList.add("todo-card", `priority-${todo.priority}`);
    card.innerHTML = `
      <div class="todo-content">
        <input type="checkbox" id="done">
        <label for="done" class="todo-check"></label>
        <div>
          <div class="todo-title">${todo.title}</div>
          <div class="todo-description">${todo.description}</div>
        </div>
      </div>
      <div class="todo-info">
        <div>
          <div class="spot"></div>${todo.dueDate}
        </div>
        <div class="priority">${todo.priority}</div>
      </div>`
    contentArea.append(card);
  });
}