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


const pallete = document.querySelectorAll(".pallete");
let colorValue = "blue";
let project = null;

pallete.forEach(div => {
  div.addEventListener("click", () => {
    colorValue = div.dataset.color;
    console.log(colorValue);
  })
})

const createProject = document.getElementById("create-project");
const projectName = document.getElementById("name");
const headerTitle = document.querySelector(".personal");

createProject.addEventListener("click", () => {
  const data = projectName.value;
  project = new Project(data, colorValue);
  projects.push(project);
  headerTitle.textContent = project.name;

  renderProject(project);
  storeProjects(projects);
  closeModal(projectDialog);
  projectName.value = "";
});

export function renderProject(project) {
  const projectLists = document.querySelector(".project-lists");
  const projectLi = document.createElement("li");
  projectLi.innerHTML = `
  <span class="project-dot" style="background-color: ${project.color}"></span>
  ${project.name}`;

  projectLi.addEventListener("click", () => {
    setActiveProject(project);
    headerTitle.textContent = project.name;
    renderTodos(project);
    return headerTitle.textContent;
  });
  projectLists.append(projectLi);
}


const saveTodo = document.querySelector(".save-todo");
const todoInput = document.getElementById("todo-input");
const todoDescription = document.getElementById("description");
const dueDate = document.getElementById("due-date");
const priority = document.getElementById("priority");
const status = document.getElementById("status");
const projectCat = document.getElementById("project-cat");
const todoForm = document.querySelector(".todo-form");
let todoState = "create";
let savedTodo = null;

saveTodo.addEventListener("click", (event) => {
  event.preventDefault();
  const inputData = todoInput.value;
  const descriptionData = todoDescription.value;
  const dateString = dueDate.value;
  const priorityData = priority.value;
  const statusData = status.value;

  if (todoState === "create") {
    const todo = new Todo(inputData, descriptionData, dateString, priorityData);
    activeProject.addTodo(todo);
    storeProjects(projects);
    renderTodos(activeProject);
    closeModal(todoDialog);
    todoForm.reset(); 

  } else {
    savedTodo.title = inputData;
    savedTodo.description = descriptionData;
    savedTodo.dueDate = dateString;
    savedTodo.priority = priorityData;
    storeProjects(projects);
    renderTodos(activeProject);
    closeModal(todoDialog);
    todoForm.reset();
    todoState = "create";
    savedTodo = null;
    console.log(savedTodo);
  }
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

    card.addEventListener("click", () => {
      const detailPanel = document.getElementById("detail-panel");
      const panelWrapper = document.querySelector(".panel-wrapper");
      detailPanel.showModal();
      panelWrapper.innerHTML = `
        <h3>${todo.title}</h3>
        <p>${todo.description}</p>
        <p>Due: ${todo.dueDate}</p>
        <p>Priority: ${todo.priority}</p>
        <p>Notes: ${todo.notes}</p>
        <div class="panel-actions">
          <button class="btn secondary-btn" id="close-panel">X</button>
          <button class="btn primary-btn" id="edit-todo">Edit</button>
        </div>
      `;

      document.getElementById("close-panel").addEventListener("click", () => {
        detailPanel.close();
      });

      document.getElementById("edit-todo").addEventListener("click", () => {
        todoInput.value = todo.title;
        todoDescription.value = todo.description;
        dueDate.value = todo.dueDate;
        priority.value = todo.priority;
        detailPanel.close();
        todoDialog.showModal();
        todoState = "edit";
        savedTodo = todo;
      });
    });
  });
}