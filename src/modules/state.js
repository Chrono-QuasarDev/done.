import { getStoredProjects } from "./storage";

export let projects = getStoredProjects() || [];
export let activeProject = null;

export function setActiveProject(project) {
  activeProject = project;
}