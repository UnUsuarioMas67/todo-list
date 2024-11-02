import "../style.css";
import { Task, Project, TodoList } from "./todo.js";
import {
  createProjectElement,
  createDefaultProjectElement,
  addProjectEventListeners,
} from "./projectsDOM.js";
import { createTaskElement } from "./tasksDOM.js";

window.addEventListener("load", initialize);

function initialize() {
  const todoList = new TodoList();
  todoList.loadFromLocalStorage();

  renderAllContent(todoList);

  const defaultProject = document.querySelector("#default-project");
  selectProject(defaultProject, todoList.defaultProject);

  const newProjectBtn = document.querySelector("#new-project-btn");
  newProjectBtn.addEventListener("click", () => addNewProject(todoList));
}

function renderAllContent(todoList) {
  renderProjectList(todoList);
}

function renderProjectList(todoList) {
  const projectList = document.querySelector("#project-list");
  projectList.textContent = "";

  todoList.projects.forEach((project, index) => {
    renderProject(project, index, todoList);
  });
}

function renderProject(project, index, todoList, edit = false) {
  const projectElem =
    project === todoList.defaultProject
      ? createDefaultProjectElement(project.name)
      : createProjectElement(project.name);

  addProjectEventListeners(
    projectElem,
    () => handleProjectClick(projectElem, project),
    () => enterProjectEditMode(projectElem, project.name),
    () => deleteProject(projectElem, index, todoList),
    () => exitProjectEdit(projectElem),
    () => exitProjectEdit(projectElem),
    (e) => handleProjectEditKeyDown(e, projectElem, project, todoList)
  );

  const li = document.createElement("li");
  li.appendChild(projectElem);

  const projectList = document.querySelector("#project-list");
  projectList.appendChild(li);

  if (edit) {
    enterProjectEditMode(projectElem);
  }
}

function handleProjectClick(projectElem, projectData) {
  selectProject(projectElem, projectData);
}

function selectProject(projectElem, projectData) {
  const projectElems = document.querySelectorAll(".project");

  projectElems.forEach((elem) => {
    if (elem === projectElem) {
      elem.classList.add("selected");
    } else {
      elem.classList.remove("selected");
    }
  });

  renderTaskList(projectData);
}

function enterProjectEditMode(projectElem, projectName = "New Project") {
  projectElem.classList.add("editting");

  const input = projectElem.querySelector(".project-input");
  input.value = projectName;
  input.select();
}

function exitProjectEdit(projectElem) {
  projectElem.classList.remove("editting");
}

function confirmProjectEdit(inputElem, projectElem, projectData, todoList) {
  if (inputElem.value.trim() === "") {
    inputElem.value = projectData.name;
    return;
  }

  const projectBtn = projectElem.querySelector(".project-btn");

  projectBtn.textContent = inputElem.value;
  projectData.name = inputElem.value;

  todoList.saveToLocalStorage();
}

function handleProjectEditKeyDown(event, projectElem, projectData, todoList) {
  if (event.key === "Escape") {
    exitProjectEdit(projectElem);
  } else if (event.key === "Enter") {
    confirmProjectEdit(event.target, projectElem, projectData, todoList);
    exitProjectEdit(projectElem);
  }
}

function deleteProject(projectElem, projectIndex, todoList) {
  projectElem.closest("li").remove();
  todoList.removeProject(projectIndex);

  todoList.saveToLocalStorage();
}

function addNewProject(todoList) {
  const project = new Project("New Project");
  todoList.addProject(project);

  renderProject(project, todoList.projects.indexOf(project), todoList, true);

  todoList.saveToLocalStorage();
}

function renderTaskList(project) {
  const taskList = document.querySelector("#task-list");
  taskList.textContent = "";

  const h1 = document.querySelector("h1");
  h1.textContent = project.name;

  project.tasks.forEach((task, index) => {
    renderTask(task, index, project);
  });
}

function renderTask(task, index, project) {
  const taskElem = createTaskElement(task);

  const taskList = document.querySelector("#task-list");
  taskList.appendChild(taskElem);
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
