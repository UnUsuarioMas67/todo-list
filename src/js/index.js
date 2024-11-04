import "../style.css";
import { Task, Project, TodoList } from "./todo.js";
import {
  createProjectElement,
  createDefaultProjectElement,
  addProjectEventListeners,
} from "./projectsDOM.js";
import { addTaskEventListeners, createTaskElement } from "./tasksDOM.js";

window.addEventListener("load", initialize);

const projectList = document.querySelector("#project-list");
const taskList = document.querySelector("#task-list");

const newTaskDialog = document.querySelector("#new-task-dialog");
const formCloseBtn = document.querySelector("#form-close-btn");
formCloseBtn.addEventListener("click", () => newTaskDialog.close());

const taskForm = document.querySelector("#task-form");
taskForm.addEventListener("submit", handleFormSubmit);

const todoList = new TodoList();
let selectedProject;

function initialize() {
  todoList.loadFromLocalStorage();

  renderProjectList();

  const defaultProject = document.querySelector("#default-project");
  selectProject(defaultProject, todoList.defaultProject);

  const newProjectBtn = document.querySelector("#new-project-btn");
  newProjectBtn.addEventListener("click", () => addNewProject());

  const newTaskBtn = document.querySelector("#new-task-btn");
  newTaskBtn.addEventListener("click", () => {
    newTaskDialog.showModal();
  });
}

function renderProjectList() {
  projectList.textContent = "";

  todoList.projects.forEach((project, index) => {
    renderProject(project, index);
  });
}

function renderProject(project, index, edit = false) {
  const projectDOM =
    project === todoList.defaultProject
      ? createDefaultProjectElement(project.name)
      : createProjectElement(project.name);

  addProjectEventListeners(
    projectDOM,
    () => handleProjectClick(projectDOM, project),
    () => enterProjectEditMode(projectDOM, project.name),
    () => deleteProject(projectDOM, index),
    () => exitProjectEdit(projectDOM),
    (e) => confirmProjectEdit(e.target, projectDOM, project),
    (e) => handleProjectEditKeyDown(e, projectDOM, project)
  );

  const li = document.createElement("li");
  li.appendChild(projectDOM);

  projectList.appendChild(li);

  if (edit) {
    enterProjectEditMode(projectDOM);
  }
}

function handleProjectClick(projectDOM, project) {
  selectProject(projectDOM, project);
}

function selectProject(projectDOM, project) {
  const projectElems = document.querySelectorAll(".project");

  projectElems.forEach((elem) => {
    if (elem === projectDOM) {
      elem.classList.add("selected");
    } else {
      elem.classList.remove("selected");
    }
  });

  renderTaskList(project);
  selectedProject = project;
}

function enterProjectEditMode(projectDOM, projectName = "New Project") {
  projectDOM.classList.add("editting");

  const input = projectDOM.querySelector(".project-input");
  input.value = projectName;
  input.select();
}

function exitProjectEdit(projectDOM) {
  projectDOM.classList.remove("editting");
}

function confirmProjectEdit(inputElem, projectDOM, project) {
  if (inputElem.value.trim() === "") {
    inputElem.value = project.name;
    return;
  }

  const projectBtn = projectDOM.querySelector(".project-btn");

  projectBtn.textContent = inputElem.value;
  project.name = inputElem.value;

  renderProjectNameHeading(project);
  exitProjectEdit(projectDOM);

  todoList.saveToLocalStorage();
}

function handleProjectEditKeyDown(event, projectDOM, project) {
  if (event.key === "Escape") {
    exitProjectEdit(projectDOM);
  } else if (event.key === "Enter") {
    confirmProjectEdit(event.target, projectDOM, project);
  }
}

function deleteProject(projectDOM, projectIndex) {
  projectDOM.closest("li").remove();
  todoList.removeProject(projectIndex);

  todoList.saveToLocalStorage();
}

function addNewProject() {
  const project = new Project("New Project");
  todoList.addProject(project);

  renderProject(project, todoList.projects.indexOf(project), true);

  todoList.saveToLocalStorage();
}

function renderProjectNameHeading(project) {
  const h1 = document.querySelector("h1");
  h1.textContent = project.name;
}

function renderTaskList(project) {
  taskList.textContent = "";

  renderProjectNameHeading(project);

  project.tasks.forEach((task, index) => {
    renderTask(task, index, project);
  });
}

function renderTask(task, index, project) {
  const taskElem = createTaskElement(task);

  addTaskEventListeners(
    taskElem,
    (e) => handleTaskCheckboxChange(e, task),
    (e) => handleTaskEditClick(e, task),
    () => deleteTask(taskElem, index, project)
  );

  taskList.appendChild(taskElem);
}

function handleTaskCheckboxChange(event, task) {
  const checkboxValue = event.target.checked;
  task.completed = checkboxValue;

  todoList.saveToLocalStorage();
}

function handleTaskEditClick(task) {
  
}

function deleteTask(taskElem, taskIndex, project) {
  taskElem.remove();
  project.removeTask(taskIndex);

  todoList.saveToLocalStorage();
}

function handleFormSubmit() {
  const title = taskForm.querySelector("#title");
  const description = taskForm.querySelector("#description");
  const dueDate = taskForm.querySelector("#due-date");
  const priority = taskForm.querySelector("#priority");

  const task = new Task(
    title.value,
    description.value,
    dueDate.value,
    priority.value
  );

  title.value = "";
  description.value = "";
  dueDate.value = null;
  priority.value = "none";

  selectedProject.addTask(task);
  renderTaskList(selectedProject);

  todoList.saveToLocalStorage();
}

function addDummyContent() {
  const project = new Project("Dummy Project");
  project.addTask(
    new Task("Dummy Task", "description", new Date("2025/2/20"), "high")
  );
  project.addTask(
    new Task(
      "Another Task",
      "this is another task",
      new Date("2024/11/10"),
      "top"
    )
  );
  project.addTask(
    new Task(
      "Third Task",
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      new Date("2024/12/1"),
      "low"
    )
  );
  todoList.addProject(project);
}
