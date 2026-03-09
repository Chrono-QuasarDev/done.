// --------- DIALOG FUNCTIONS ------------
// ----- PROJECT DIALOG ------
const projectDialog = document.getElementById("project-modal");
const wrapper = document.querySelector(".modal-wrapper");
const addProject = document.getElementById("add-project");
const cancel = document.getElementById("cancel");


addProject.addEventListener("click", () =>  projectDialog.showModal());

cancel.addEventListener("click", () => projectDialog.close());

projectDialog.addEventListener("click", (event) => {
  if(!wrapper.contains(event.target)) {
    projectDialog.close();
  }
});