import { projects, renderProject } from "../index";
import { Project } from "../modules/project";
import { storeProjects } from "../modules/storage";

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


const createProject = document.getElementById("create-project");
const projectName = document.getElementById("name");
const pallete = document.querySelectorAll(".pallete");
let colorValue = "blue";

pallete.forEach(div => {
  div.addEventListener("click", () => {
    colorValue = div.dataset.color;
    console.log(colorValue);
  })
})

createProject.addEventListener("click", () => {
  const data = projectName.value;
  const project = new Project(data, colorValue);
  projects.push(project);

  renderProject(project);

  storeProjects(projects);
  closeModal(projectDialog);
  projectName.value = "";
});