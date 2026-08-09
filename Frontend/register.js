const username = document.querySelector("#register_username");
const email = document.querySelector("#register_email");
const password = document.querySelector("#register_password");
const confirm_password = document.querySelector("#register_confirm_password");
const submit_button = document.querySelector(".register-btn");

import { registerApi } from "./auth.Api.js";

submit_button.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!username.value.trim() && !email.value.trim() && !password.value.trim() && !confirm_password.value.trim()) {
        return alert("All Fields are required");
    }

    if (!username.value.trim()) {
        return alert("Username is required");
    }

    if (!email.value.trim()) {
        return alert("Email is required");
    }

    if (!password.value.trim()) {
        return alert("Password is required");
    }

    if (!confirm_password.value.trim()) {
        return alert("Confirm Password is required");
    }

    if (username.value.trim().length < 3) {
        return alert("Username must be at least 3 characters");
    }

    if (password.value.length < 8) {
        return alert("Password must be at least 8 numbers or characters");
    }

    if (password.value !== confirm_password.value) {
        return alert("Passwords do not match");
    }

    const userData = {
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value.trim()
    };
    
    try {
        const user = await registerApi(userData);

        if (user?.message === "User register successfully" || user?.message === "User registered successfully") {
            username.value = "";
            password.value = "";
            email.value = "";
            confirm_password.value = "";
            window.location.href = "login.html";
        } else {
            alert(user?.message || "Registration failed");
        }

    } catch (error) {
        console.log(error.message);
        alert("Registration error. Please check server.");
    }
});