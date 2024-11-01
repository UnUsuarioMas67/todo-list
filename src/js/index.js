import "../style.css";
import { Task, Project, TodoList } from "./todo.js";
import {
  createProjectElement,
  createDefaultProjectElement,
} from "./projectsDOM.js";

window.addEventListener("load", initialize);

function initialize() {
  const todoList = new TodoList();
  todoList.loadFromLocalStorage();

  renderAllContent(todoList);
  const defaultProject = document.querySelector("#default-project");
  defaultProject.classList.add("selected");

  todoList.saveToLocalStorage();
}

function renderAllContent(todoList) {
  renderProjectList(todoList);
}

function renderProjectList(todoList) {
  const projectList = document.querySelector("#project-list");
  projectList.textContent = "";

  todoList.projects.forEach((project) => {
    const projectElem =
      project === todoList.defaultProject
        ? createDefaultProjectElement(project.name)
        : createProjectElement(project.name);

    projectList.appendChild(projectElem);
  });
}

function addDummyContent(todoList) {
  const project = new Project("Dummy Project");
  project.addTask(
    new Task("Dummy Task", "description", new Date("2025/20/2"), "high")
  );
  todoList.addProject(project);

  const project2 = new Project("Dummy Project2");
  project2.addTask(
    new Task("Dummy Task", "description", new Date("2025/20/2"), "high")
  );
  todoList.addProject(project2);
}
