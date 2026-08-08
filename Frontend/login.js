const email = document.querySelector("#login_email");
const password = document.querySelector("#login_password");

const submit_btn = document.querySelector(".login-btn")

import { loginApi } from "./auth.Api.js";

submit_btn.addEventListener("click", async (e) => {
    e.preventDefault();

    if(!email.value.trim()) {
        return alert("Email is required");
    }

    if(!password.value.trim()) {
        return alert("Password is required");
    }

    if(password.value.length < 8) {
        return alert("Password must be at least 8 digit or characters");
    }

    const userData = {
        email : email.value,
        password : password.value
    }

    try{
        const user = await loginApi(userData);

        email.value = "";
        password.value = "";

        window.location.href = "/Frontend/dashboard.html?";

    } catch (error) {
        console.log(error.message);
    }

});