class Task {
  constructor(
    title,
    description,
    dueDate = null,
    priority = null,
    completed = false
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority; // low, medium, high, top

    this.completed = completed;
  }
}

class Project {
  constructor(name, tasks = []) {
    this.name = name;
    this.tasks = tasks;
  }
}

class TodoList {
  #projects = [new Project("Default")];

  pushProject(project) {
    this.#projects.push(project);
  }

  removeProject(projectIndex) {
    this.#projects.splice(projectIndex, 1);
  }

  get projects() {
    return [...this.#projects];
  }

  pushTask(task, projectIndex) {
    this.#projects[projectIndex].tasks.push(task);
  }

  removeTask(taskId, projectIndex) {
    this.#projects[projectIndex].tasks.splice(taskId, 1);
  }

  saveToLocalStorage() {
    localStorage.setItem("todo-projects", JSON.stringify(this.#projects));
  }

  loadFromLocalStorage() {
    const item = localStorage.getItem("todo-projects");
    if (!item) {
      this.#projects = [new Project("Default")];
      return;
    }

    this.#projects = JSON.parse(item);
  }
}

export default { Task, Project, TodoList };
