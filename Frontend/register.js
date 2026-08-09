const username = document.querySelector("#register_username");
const email = document.querySelector("#register_email");
const password = document.querySelector("#register_password");
const confirm_password = document.querySelector("#register_confirm_password");

const submit_button = document.querySelector(".register-btn")

import { registerApi } from "./auth.Api.js";

submit_button.addEventListener("click", async (e) => {
    e.preventDefault();

    if(!username.value.trim() && !email.value.trim() && !password.value.trim() && !confirm_password.value.trim()) {
        return alert("All Fields are required");
    }

    if(!username.value.trim()) {
        return alert("Username is required");
    }

    if(!email.value.trim()) {
        return alert("Email is required");
    }

    if(!password.value.trim()) {
        return alert("Password is required");
    }

    if(!confirm_password.value.trim()) {
        return alert("Confirm Password is required");
    }

    if(username.value.length < 3) {
        return alert("Username must be at least 3 characters");
    }

    if(password.value.length < 8) {
        return alert("Password must be at least 8 number or characters");
    }

    if(password.value != confirm_password.value) {
        return alert("Please Provide Correct confirm password");
    }

    let userData = {
        username: username.value,
        email: email.value,
        password: password.value
    }
    
    try {
    const user = await registerApi(userData);

    username.value = "";
    password.value = "";
    email.value = "";
    confirm_password.value = "";

    window.location.href = "login.html";

    } catch (error) {
        console.log(error.message);
    }

});