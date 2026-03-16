export function storeProjects(allProjects) {
  localStorage.setItem("projects", JSON.stringify(allProjects));
}

export function getStoredProjects() {
  const data = localStorage.getItem("projects");
  if (!data) return [];
  const parsed = JSON.parse(data);
  return Array.isArray(parsed) ? parsed : [];
}
