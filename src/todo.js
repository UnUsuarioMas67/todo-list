const { format, formatDistanceToNow, compareAsc } = require("date-fns");

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

  get formattedDueDate() {
    if (!this.dueDate) {
      return "";
    }

    return format(this.dueDate, "P");
  }

  get dueDateDistance() {
    if (!this.dueDate) {
      return "";
    }

    return compareAsc(this.dueDate, new Date()) != -1
      ? formatDistanceToNow(this.dueDate)
      : "Expired";
  }
}

class Project {
  constructor(name, tasks = []) {
    this.name = name;
    this.tasks = tasks;
  }

  addTask(newTask) {
    this.tasks.push(newTask);
  }

  removeTask(taskIndex) {
    this.tasks.splice(taskIndex, 1);
  }
}

class TodoList {
  defaultProject = new Project("Default");
  projects = [this.defaultProject];

  addProject(project) {
    this.projects.push(project);
  }

  removeProject(projectIndex) {
    this.projects.splice(projectIndex, 1);
  }

  saveToLocalStorage() {
    localStorage.setItem("todo-projects", JSON.stringify(this.projects));
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

export { Task, Project, TodoList };
