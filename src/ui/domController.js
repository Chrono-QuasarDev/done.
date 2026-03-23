import { projects, activeProject, setActiveProject } from "../modules/state";
import { Project } from "../modules/project";
import { storeProjects } from "../modules/storage";
import { Todo } from "../modules/todo";
import { removeProject } from "../modules/state";

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
let project = null; // This contains the project object that is created when the form is filled in.

pallete.forEach(div => {
  div.addEventListener("click", () => {
    colorValue = div.dataset.color;
  })
})

const createProject = document.getElementById("create-project");
const projectName = document.getElementById("name");
const headerTitle = document.querySelector(".personal");

createProject.addEventListener("click", () => {
  const data = projectName.value;
  project = new Project(data, colorValue); // Creates the project object from the project class constructor.
  projects.push(project); // This adds the created project into an array.
  setActiveProject(project); // Set as active project
  headerTitle.textContent = project.name;

  renderProject(project); // This creates and renderes the project visually.
  renderTodos(project); // Render todos (empty list) and update stats
  
  // Mark new project as selected visually
  document.querySelectorAll(".project-lists li").forEach(li => {
    li.classList.remove("selected");
  });
  const newProjectLi = document.querySelector(".project-lists li:last-child");
  if (newProjectLi) {
    newProjectLi.classList.add("selected");
  }
  
  storeProjects(projects); // Stores the array that has all the projects in the localStorage.
  closeModal(projectDialog);
  projectName.value = "";
});

export function renderProject(project) {
  const projectLists = document.querySelector(".project-lists");
  const projectLi = document.createElement("li");
  projectLi.innerHTML = `
  <div class="project-info">
    <span class="project-dot" style="background-color: ${project.color}"></span>
    ${project.name}
  </div>
  <div class="close-project">x</div>`;

  projectLi.addEventListener("click", () => {
    setActiveProject(project);
    headerTitle.textContent = project.name;
    
    // Remove selected class from all projects
    document.querySelectorAll(".project-lists li").forEach(li => {
      li.classList.remove("selected");
    });
    // Add selected class to clicked project
    projectLi.classList.add("selected");
    
    renderTodos(project);
    return headerTitle.textContent;
  });

  const closeProjectElement = projectLi.querySelector(".close-project");
  closeProjectElement.addEventListener("click", (event) => {
    event.stopPropagation();
    removeProject(project.name);
    storeProjects(projects);
    
    // If deleted project was active, clear everything
    if (activeProject === project) {
      setActiveProject(null);
      headerTitle.textContent = '';
      contentArea.innerHTML = '';
      document.getElementById("todo-num").textContent = '0';
      document.getElementById("completed-num").textContent = '0';
      document.getElementById("remaining-num").textContent = '0';
    }
    
    renderAllProjects();
  });

  projectLists.append(projectLi);
}

function renderAllProjects() {
  const projectLists = document.querySelector(".project-lists");
  projectLists.innerHTML = '';
  projects.forEach(proj => renderProject(proj));
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

function setProjectAsActive(project) {
  setActiveProject(project);
  headerTitle.textContent = project.name;
  
  // Mark as selected in sidebar
  const projectLis = document.querySelectorAll(".project-lists li");
  projectLis.forEach((li, index) => {
    li.classList.remove("selected");
    if (projects[index] === project) {
      li.classList.add("selected");
    }
  });
}

saveTodo.addEventListener("click", (event) => {
  event.preventDefault();
  
  const inputData = todoInput.value;
  const descriptionData = todoDescription.value;
  const dateString = dueDate.value;
  const priorityData = priority.value;
  const projectName = projectCat.value.trim();
  
  let targetProject = activeProject;
  
  // If project name is provided in the form, find or create project
  if (projectName) {
    // Check if project already exists (case-insensitive)
    targetProject = projects.find(p => p.name.toLowerCase() === projectName.toLowerCase());
    
    // If project doesn't exist, create it
    if (!targetProject) {
      targetProject = new Project(projectName, "blue"); // default color for implicitly created projects
      projects.push(targetProject);
      renderProject(targetProject);
    }
    
    setProjectAsActive(targetProject);
  }
  
  // Guard: Can't add todo without a target project
  if (!targetProject) {
    alert("Please create or select a project first");
    return;
  }
  
  if (todoState === "create") {
    const todo = new Todo(inputData, descriptionData, dateString, priorityData);
    targetProject.addTodo(todo);
    storeProjects(projects);
    renderTodos(targetProject);
    closeModal(todoDialog);
    todoForm.reset(); 

  } else {
    savedTodo.title = inputData;
    savedTodo.description = descriptionData;
    savedTodo.dueDate = dateString;
    savedTodo.priority = priorityData;
    storeProjects(projects);
    renderTodos(targetProject);
    closeModal(todoDialog);
    todoForm.reset();
    todoState = "create";
    savedTodo = null;
  }
});


export function renderTodos(project) {
  contentArea.innerHTML = '';
  project.todos.forEach(todo => {
    const card = createTodoCard(todo);
    contentArea.appendChild(card);
  });

  const totalTodos = project.todos.length;
  const completedTodos = project.todos.filter(todo => todo.completed === true).length;
  const remainingTodos = totalTodos - completedTodos;
  renderDynamicStats(totalTodos, completedTodos, remainingTodos);
}

function createTodoCard(todo) {
  const card = document.createElement("div");
  card.classList.add("todo-card", `priority-${todo.priority}`);
  if (todo.completed) {
    card.classList.add("completed");
  }
  
  // Create unique ID for checkbox
  const uniqueId = "todo-" + Date.now() + "-" + Math.random().toString(36).slice(2);
  
  card.innerHTML = `
    <div class="todo-content">
      <input type="checkbox" id="${uniqueId}">
      <label for="${uniqueId}" class="todo-check"></label>
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
      <div class="delete-todo">x</div>
    </div>
  `;

  const todoCheckbox = card.querySelector(".todo-check");
  const todoCheckInput = card.querySelector("input[type='checkbox']");

  todoCheckInput.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  todoCheckbox.addEventListener("click", (event) => {
    event.stopPropagation();
    todo.setComplete();
    card.classList.toggle("completed", todo.completed);
    storeProjects(projects);
    renderDynamicStats(
      activeProject.todos.length,
      activeProject.todos.filter(t => t.completed).length,
      activeProject.todos.filter(t => !t.completed).length
    );
  });

  const closeTodoElement = card.querySelector(".delete-todo");

  closeTodoElement.addEventListener("click", (event) => {
    event.stopPropagation();
    activeProject.removeTodo(todo.title);
    storeProjects(projects);
    renderTodos(activeProject);
  });

  card.addEventListener("mouseenter", () => {
    closeTodoElement.style.opacity = 1;
  });

  card.addEventListener("mouseleave", () => {
    closeTodoElement.style.opacity = 0;
  });

  card.addEventListener("click", () => {
    const detailPanel = document.getElementById("detail-panel");
    const panelWrapper = document.querySelector(".panel-wrapper");
    detailPanel.showModal();
    panelWrapper.innerHTML = `
      <h3>${todo.title}</h3>
      <p>${todo.description}</p>
      <p>Due: ${todo.dueDate}</p>
      <p>Priority: ${todo.priority}</p>
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
  return card;
}

function renderDynamicStats(total, completed, remaining) {
  document.getElementById("todo-num").textContent = total;
  document.getElementById("completed-num").textContent = completed;
  document.getElementById("remaining-num").textContent = remaining;
}