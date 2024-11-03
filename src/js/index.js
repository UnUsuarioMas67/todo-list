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
  const projectElem =
    project === todoList.defaultProject
      ? createDefaultProjectElement(project.name)
      : createProjectElement(project.name);

  addProjectEventListeners(
    projectElem,
    () => handleProjectClick(projectElem, project),
    () => enterProjectEditMode(projectElem, project.name),
    () => deleteProject(projectElem, index),
    () => exitProjectEdit(projectElem),
    () => exitProjectEdit(projectElem),
    (e) => handleProjectEditKeyDown(e, projectElem, project, todoList)
  );

  const li = document.createElement("li");
  li.appendChild(projectElem);

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
  selectedProject = projectData;
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

function confirmProjectEdit(inputElem, projectElem, projectData) {
  if (inputElem.value.trim() === "") {
    inputElem.value = projectData.name;
    return;
  }

  const projectBtn = projectElem.querySelector(".project-btn");

  projectBtn.textContent = inputElem.value;
  projectData.name = inputElem.value;

  renderProjectNameHeading(projectData);

  todoList.saveToLocalStorage();
}

function handleProjectEditKeyDown(event, projectElem, projectData) {
  if (event.key === "Escape") {
    exitProjectEdit(projectElem);
  } else if (event.key === "Enter") {
    confirmProjectEdit(event.target, projectElem, projectData);
    exitProjectEdit(projectElem);
  }
}

function deleteProject(projectElem, projectIndex) {
  projectElem.closest("li").remove();
  todoList.removeProject(projectIndex);

  todoList.saveToLocalStorage();
}

function addNewProject() {
  const project = new Project("New Project");
  todoList.addProject(project);

  renderProject(project, todoList.projects.indexOf(project), todoList, true);

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

function addDummyContent(todoList) {
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
