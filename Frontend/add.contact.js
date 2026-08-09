const first_name = document.querySelector("#first-name");
const last_name = document.querySelector("#last-name");
const email = document.querySelector("#email");
const phone_number = document.querySelector("#number");
const address = document.querySelector("#address");

const add_contact_btn = document.querySelector(".add-contact-btn");
const cancel_btn = document.querySelector(".cancel-btn");

import { createTaskApi } from "./contact.api.js";

cancel_btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "dashboard.html";
});

add_contact_btn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (
        !first_name.value.trim() &&
        !last_name.value.trim() &&
        !email.value.trim() &&
        !phone_number.value &&
        !address.value.trim()
    ) {
        return alert("Enter All Details");
    }

    if (!first_name.value.trim()) {
        return alert("First Name is required");
    }

    if (!last_name.value.trim()) {
        return alert("Last Name is required");
    }

    if (!email.value.trim()) {
        return alert("Email is required");
    }

    if (!phone_number.value) {
        return alert("Phone Number is required");
    }

    if (!address.value.trim()) {
        return alert("Address is required");
    }

    if (first_name.value.trim().length < 3) {
        return alert("First Name must be at least 3 characters");
    }

    if (last_name.value.trim().length < 3) {
        return alert("Last Name must be at least 3 characters");
    }

    if (String(phone_number.value).length !== 10) {
        return alert("Please provide valid 10-digit phone number");
    }

    const contactData = {
        firstName: first_name.value.trim(),
        lastName: last_name.value.trim(),
        email: email.value.trim(),
        phoneNumber: +phone_number.value,
        address: address.value.trim()
    };

    console.log(contactData);

    const task = await createTaskApi(contactData);
    if (task?.message === "Task created successfully") {
        window.location.href = "dashboard.html";
    }
});