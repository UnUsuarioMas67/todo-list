import "../style.css";
import { Task, Project, TodoList } from "./todo";

window.addEventListener("load", initialize);

function initialize() {
  const todoList = new TodoList();
  todoList.loadFromLocalStorage();

  // const project = new Project("Dummy Project");
  // project.addTask(
  //   new Task("Dummy Task", "description", new Date("2025/20/2"), "high")
  // );
  // todoList.addProject(project);
  
  // const project2 = new Project("Dummy Project2");
  // project.addTask(
  //   new Task("Dummy Task", "description", new Date("2025/20/2"), "high")
  // );
  // todoList.addProject(project2);

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
        ? renderDefaultProject(project)
        : renderProject(project);

    projectList.appendChild(projectElem);
  });
}

function renderDefaultProject(project) {
  const li = document.createElement("li");

  const projectElem = document.createElement("div");
  projectElem.classList.add("project");
  projectElem.id = "default-project";

  li.appendChild(projectElem);

  const display = document.createElement("div");
  display.classList.add("project-display");

  projectElem.appendChild(display);

  const projectBtn = document.createElement("button");
  projectBtn.classList.add("project-btn");
  projectBtn.textContent = project.name;
  // Handle click event here

  display.appendChild(projectBtn);

  return li;
}

function renderProject(project) {
  const li = document.createElement("li");

  const projectElem = document.createElement("div");
  projectElem.classList.add("project");

  li.appendChild(projectElem);

  projectElem.appendChild(createProjectDisplay(project));
  projectElem.appendChild(createProjectEdit(project));

  return li;
}

function createProjectDisplay(project) {
  const display = document.createElement("div");
  display.classList.add("project-display");

  const projectBtn = document.createElement("button");
  projectBtn.classList.add("project-btn");
  projectBtn.textContent = project.name;
  // Handle click event here
  display.appendChild(projectBtn);

  const editBtn = createEditBtn();
  editBtn.classList.add("project-edit-btn");
  display.appendChild(editBtn);

  const deleteBtn = createDeleteBtn();
  deleteBtn.classList.add("project-delete-btn");
  display.appendChild(deleteBtn);

  return display;
}

function createProjectEdit(project) {
  const edit = document.createElement("div");
  edit.classList.add("project-edit");

  const input = document.createElement("input");
  input.type = "text";
  input.classList.add("project-input");
  input.value = project.name;
  edit.appendChild(input);

  const cancelBtn = createCloseBtn();
  cancelBtn.classList.add("project-cancel-btn");
  edit.appendChild(cancelBtn);

  return edit;
}

function createEditBtn() {
  const button = document.createElement("button");
  button.classList.add("icon-btn");
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24">
                  <title>pencil</title>
                  <path
                    d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                </svg>`;

  return button;
}

function createDeleteBtn() {
  const button = document.createElement("button");
  button.classList.add("icon-btn");
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24">
                  <title>delete</title>
                  <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                </svg>`;

  return button;
}

function createCloseBtn() {
  const button = document.createElement("button");
  button.classList.add("icon-btn");
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24">
                  <title>close</title>
                  <path
                    d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>`;

  return button;
}
