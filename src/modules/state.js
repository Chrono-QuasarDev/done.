import { renderProject } from "../ui/domController";
import { getStoredProjects, storeProjects } from "./storage";

export let projects = getStoredProjects() || [];
export let activeProject = null;

export function setActiveProject(project) {
  activeProject = project;
}

export function removeProject(name) {
  const index = projects.findIndex(p => p.name === name);
  if (index !== -1) projects.splice(index, 1);
}