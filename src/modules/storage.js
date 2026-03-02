export function storeProjects(allProjects) {
  localStorage.setItem("projects", JSON.stringify(allProjects));
}

export function getStoredProjects() {
  const data = localStorage.getItem("projects");
  return data ? JSON.parse(data) : [];
}
