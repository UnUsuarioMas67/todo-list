import {
  createEditBtn,
  createDeleteBtn,
  createCloseBtn,
} from "./buttonsDOM.js";

function createDefaultProjectElement(projectName) {
  const projectElem = document.createElement("div");
  projectElem.classList.add("project");
  projectElem.id = "default-project";

  const display = document.createElement("div");
  display.classList.add("project-display");

  projectElem.appendChild(display);

  const projectBtn = document.createElement("button");
  projectBtn.classList.add("project-btn");
  projectBtn.textContent = projectName;
  // Handle click event here

  display.appendChild(projectBtn);

  return projectElem;
}

function createProjectElement(projectName) {
  const projectElem = document.createElement("div");
  projectElem.classList.add("project");

  projectElem.appendChild(createProjectDisplay(projectName));
  projectElem.appendChild(createProjectEdit(projectName));

  return projectElem;
}

function createProjectDisplay(projectName) {
  const display = document.createElement("div");
  display.classList.add("project-display");

  const projectBtn = document.createElement("button");
  projectBtn.classList.add("project-btn");
  projectBtn.textContent = projectName;
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

function createProjectEdit(projectName) {
  const edit = document.createElement("div");
  edit.classList.add("project-edit");

  const input = document.createElement("input");
  input.type = "text";
  input.classList.add("project-input");
  input.value = projectName;
  edit.appendChild(input);

  const cancelBtn = createCloseBtn();
  cancelBtn.classList.add("project-cancel-btn");
  edit.appendChild(cancelBtn);

  return edit;
}

function addProjectEventListeners(
  project,
  onClick,
  onEditClick = null,
  onDeleteClick = null,
  onCancelClick = null,
  onInputBlur = null,
  onKeyDown = null
) {
  const projectBtn = project.querySelector(".project-btn");
  if (!!projectBtn && !!onClick) {
    projectBtn.addEventListener("click", onClick);
  }

  const editBtn = project.querySelector(".project-edit-btn");
  if (!!editBtn && !!onEditClick) {
    editBtn.addEventListener("click", onEditClick);
  }

  const deleteBtn = project.querySelector(".project-delete-btn");
  if (!!deleteBtn && !!onDeleteClick) {
    deleteBtn.addEventListener("click", onDeleteClick);
  }

  const input = project.querySelector(".project-input");
  if (!!input && !!onInputBlur) {
    input.addEventListener("blur", onInputBlur);
  }
  if (!!input && !!onKeyDown) {
    input.addEventListener("keydown", onKeyDown);
  }

  const cancelBtn = project.querySelector(".project-cancel-btn");
  if (!!cancelBtn && !!onCancelClick) {
    cancelBtn.addEventListener("click", onCancelClick);
  }
}

export { createProjectElement, createDefaultProjectElement, addProjectEventListeners };
