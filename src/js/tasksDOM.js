import { createEditBtn, createDeleteBtn } from "./buttonsDOM.js";

function createTaskElement(task) {
  const taskElem = document.createElement("div");
  taskElem.classList.add("task");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");
  checkbox.checked = task.completed;
  taskElem.appendChild(checkbox);

  const header = document.createElement("p");
  header.classList.add("task-header");
  taskElem.appendChild(header);

  const title = document.createElement("span");
  title.classList.add("task-title");
  title.textContent = task.title;
  header.appendChild(title);

  if (!!task.priority && task.priority !== "none") {
    const priority = document.createElement("span");
    priority.classList.add("task-priority", task.priority);
    priority.textContent = task.priority;
    header.appendChild(priority);
  }

  const description = document.createElement("p");
  description.classList.add("task-description");
  description.textContent = task.description;
  taskElem.appendChild(description);

  if (!!task.dueDate) {
    const dueDate = document.createElement("p");
    dueDate.classList.add("task-date");

    const calendar = createCalendarIcon();
    dueDate.appendChild(calendar);

    const dateText = document.createTextNode(
      `${task.formattedDueDate} - ${task.dueDateDistance}`
    );
    dueDate.appendChild(dateText);

    taskElem.appendChild(dueDate);
  }

  const editBtn = createEditBtn();
  editBtn.classList.add("task-edit-btn");
  taskElem.appendChild(editBtn);

  const deleteBtn = createDeleteBtn();
  deleteBtn.classList.add("task-delete-btn");
  taskElem.appendChild(deleteBtn);

  return taskElem;
}

function createCalendarIcon() {
  const span = document.createElement("span");
  span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24">
              <title>calendar-blank</title>
              <path
                d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1" />
            </svg>`;

  return span;
}

function addTaskEventListeners(
  taskElem,
  onCheckboxChange,
  onEditClick,
  onDeleteClick
) {
  const checkbox = taskElem.querySelector(".task-checkbox");
  checkbox.addEventListener("change", onCheckboxChange);

  const editBtn = taskElem.querySelector(".task-edit-btn");
  editBtn.addEventListener("click", onEditClick);

  const deleteBtn = taskElem.querySelector(".task-delete-btn");
  deleteBtn.addEventListener("click", onDeleteClick);
}

export { createTaskElement, addTaskEventListeners };
