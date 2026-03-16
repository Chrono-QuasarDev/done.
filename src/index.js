import "./style.css";
import { Todo } from "./modules/todo";
import { Project } from "./modules/project";
import { storeProjects, getStoredProjects} from "./modules/storage";
import "./ui/domController";


export let projects = getStoredProjects() || [];
projects.forEach(project => renderProject(project));

export function renderProject(project) {
  const projectLists = document.querySelector(".project-lists");

  const projectLi = document.createElement("li");
  projectLi.innerHTML = `
  <span class="project-dot" style="background-color: ${project.color}"></span>
  ${project.name}`;

  projectLi.addEventListener("click", () => {
    const headerTitle = document.querySelector(".personal");
    headerTitle.textContent = project.name;
  });
  projectLists.append(projectLi);
}