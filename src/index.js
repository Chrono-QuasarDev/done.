import "./style.css";
import { renderProject, renderTodos } from "./ui/domController";
import { projects, setActiveProject } from "./modules/state";

// Render all projects from storage
projects.forEach(project => renderProject(project));

// Auto-select first project on load if any exist
if (projects.length > 0) {
  setActiveProject(projects[0]);
  const headerTitle = document.querySelector(".personal");
  headerTitle.textContent = projects[0].name;
  
  // Mark first project as selected visually
  const projectLis = document.querySelectorAll(".project-lists li");
  if (projectLis.length > 0) {
    projectLis[0].classList.add("selected");
  }
  
  // Render todos for first project
  renderTodos(projects[0]);
}
