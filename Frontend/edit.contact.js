import { getTaskApi, updateTaskApi } from "./contact.api.js";

const firstNameInput = document.querySelector("#first-name");
const lastNameInput = document.querySelector("#last-name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#number");
const addressInput = document.querySelector("#address");
const updateContactBtn = document.querySelector(".update-contact-btn");
const cancelBtn = document.querySelector(".cancel-btn");

const params = new URLSearchParams(window.location.search);
const taskId = params.get("taskId");

const redirectToDashboard = () => {
  window.location.href = "dashboard.html";
};

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  redirectToDashboard();
});

const fillForm = (task) => {
  firstNameInput.value = task.firstName || "";
  lastNameInput.value = task.lastName || "";
  emailInput.value = task.email || "";
  phoneInput.value = task.phoneNumber || "";
  addressInput.value = task.address || "";
};

const loadTask = async () => {
  if (!taskId) {
    return redirectToDashboard();
  }

  try {
    const response = await getTaskApi(taskId);
    if (response.task) {
      fillForm(response.task);
    } else {
      redirectToDashboard();
    }
  } catch (error) {
    console.error(error.message);
    redirectToDashboard();
  }
};

updateContactBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  if (
    !firstNameInput.value.trim() ||
    !lastNameInput.value.trim() ||
    !emailInput.value.trim() ||
    !phoneInput.value.trim() ||
    !addressInput.value.trim()
  ) {
    return alert("Enter all contact details");
  }

  try {
    const contactData = {
      firstName: firstNameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      email: emailInput.value.trim(),
      phoneNumber: +phoneInput.value.trim(),
      address: addressInput.value.trim(),
    };

    const response = await updateTaskApi(taskId, contactData);
    if (response.message === "Task updated successfully") {
      redirectToDashboard();
    }
  } catch (error) {
    console.error(error.message);
    alert("Unable to update contact. Please try again.");
  }
});

loadTask();