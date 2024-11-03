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

  static createFromObject(obj) {
    const { title, description, dueDate, priority, completed } = obj;
    return new Task(title, description, dueDate, priority, completed);
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

  static createFromObject(obj) {
    const { name, tasks } = obj;
    const project = new Project(name);

    tasks.forEach((t) => {
      project.addTask(Task.createFromObject(t));
    });

    return project;
  }
}

class TodoList {
  defaultProject = new Project("Default");
  projects = [this.defaultProject];

  constructor() {
    this.defaultProject.addTask(
      new Task("Get started now", "Try adding new projects and tasks to manage")
    );
  }

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
      this.projects = [this.defaultProject];
      return;
    }

    this.projects = [];

    const parsedItem = JSON.parse(item);
    parsedItem.forEach((p) => {
      this.addProject(Project.createFromObject(p));
    });

    this.defaultProject = this.projects[0];
  }
}

export { Task, Project, TodoList };
