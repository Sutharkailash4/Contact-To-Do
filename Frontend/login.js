const email = document.querySelector("#login_email");
const password = document.querySelector("#login_password");
const submit_btn = document.querySelector(".login-btn");

import { loginApi } from "./auth.Api.js";

submit_btn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!email.value.trim()) {
        return alert("Email is required");
    }

    if (!password.value.trim()) {
        return alert("Password is required");
    }

    if (password.value.length < 8) {
        return alert("Password must be at least 8 digits or characters");
    }

    const userData = {
        email: email.value.trim(),
        password: password.value.trim()
    };

    try {
        const user = await loginApi(userData);

        if (user?.message === "User login successfully" || user?.message === "User logged in successfully") {
            email.value = "";
            password.value = "";
            window.location.href = "dashboard.html";
        } else {
            alert(user?.message || "Login failed");
        }

    } catch (error) {
        console.log(error.message);
        alert("Unable to login. Please check server.");
    }
});