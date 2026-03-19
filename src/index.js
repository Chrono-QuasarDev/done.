import "./style.css";
import { renderProject } from "./ui/domController";
import { projects } from "./modules/state";

projects.forEach(project => renderProject(project));
