const fisrt_name = document.querySelector("#first-name");
const last_name = document.querySelector("#last-name");
const email = document.querySelector("#email");
const phone_number = document.querySelector("#number");
const address = document.querySelector("#address");

const add_contact_btn = document.querySelector(".add-contact-btn");
const cancel_btn = document.querySelector(".cancel-btn");

cancel_btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/Frontend/dashboard.html?";
});

add_contact_btn.addEventListener("click", (e) => {
    e.preventDefault();

    if(!fisrt_name.ariaValueMax.trim() && !last_name.ariaValueMax.trim() && !email.ariaValueMax.trim() && !phone_number.value && !address.value.trim()) {
        return alert("Enter All Details");
    }

    if(!fisrt_name.value.trim()) {
        return alert("Fisrt Name is required");
    }

    if(!last_name.value.trim()) {
        return alert("Last Name is required");
    }

    if(!email.value.trim()) {
        return alert("Email is required");
    }

    if(!phone_number.value) {
        return alert("Phone Number is required");
    }

    if(!address.value.trim()) {
        return alert("Address is required");
    }

    
});