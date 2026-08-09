import { getAllTaskApi, deleteTaskApi } from "./contact.api.js";
import { logoutApi } from "./auth.Api.js";

const add_btn = document.querySelector(".add-contact-btn");
const register = document.querySelector(".register-list");
const login = document.querySelector(".login-list");
const logout = document.querySelector(".logout-list");
const tableBody = document.querySelector("tbody");

add_btn.addEventListener("click", () => {
  window.location.href = "add.contact.html";
});

register.addEventListener("click", () => {
  window.location.href = "register.html";
});

login.addEventListener("click", () => {
  window.location.href = "login.html";
});

logout.addEventListener("click", async () => {
  try {
    await logoutApi();
  } catch (error) {
    console.warn("Logout failed:", error.message);
  }
  window.location.href = "login.html";
});

const renderTasks = (tasks) => {
  tableBody.innerHTML = "";

  if (!tasks?.length) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5">No contacts found. Add a contact to begin.</td>
      </tr>
    `;
    return;
  }

  tasks.forEach((task) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${task.firstName}</td>
      <td>${task.lastName}</td>
      <td>${task.email}</td>
      <td>${task.phoneNumber}</td>
      <td class="action-box">
        <button class="edit-btn" data-id="${task._id}">Edit</button>
        <button class="delete-btn" data-id="${task._id}">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const taskId = button.dataset.id;
      try {
        await deleteTaskApi(taskId);
        await getAllTask();
      } catch (error) {
        console.error("Delete failed:", error.message);
      }
    });
  });

  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const taskId = button.dataset.id;
      window.location.href = `edit.contact.html?taskId=${taskId}`;
    });
  });
};

const getAllTask = async () => {
  try {
    const response = await getAllTaskApi();
    renderTasks(response.allTasks || []);
  } catch (error) {
    console.log(error.message);
  }
};

getAllTask();