import { checkRequired } from "./validators.js";

const loginEmail = document.getElementById("lg-email");
const loginPassword = document.getElementById("lg-pw");
const loginButton = document.getElementById("lg-btn");
const registerButton = document.getElementById("register-btn");

const emailError = document.getElementById("email-err");
const passwordError = document.getElementById("pw-err");
const alert = document.getElementById("alert");
const alertMessage = document.getElementById("alert-message");
const closeAlert = document.getElementById("close-alert");

function validateEmail() {
    return checkRequired(loginEmail, emailError, "Email");
};

document.addEventListener("DOMContentLoaded", () => {
    loginEmail.onkeyup = validateEmail;
});

function validatePassword() {
    return checkRequired(loginPassword, passwordError, "Password");
};

document.addEventListener("DOMContentLoaded", () => {
    loginPassword.onkeyup = validatePassword;
});

function validateInputs() {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    if (isEmailValid === true && isPasswordValid === true) {
        return true;
    }
    return false;
}

function hideAlert() {
    alert.classList.add("d-none");
}

document.addEventListener("DOMContentLoaded", () => {
    closeAlert.onclick = hideAlert;
});

async function login() {
    alertMessage.innerHTML = "";
    alert.classList.add("d-none");
    const isInputsValid = validateInputs();
    if (isInputsValid === true) {
        const hashedPassword = await hashPassword(loginPassword);
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: loginEmail.value,
                password: hashedPassword,
                expiresInMins: 30,
            })
        });
        const status = response.status;
        const result = await response.json();
        if (status == 200) {
            window.location.href = "../pages/dashboard.html";
        }
        else {
            alertMessage.innerHTML = result.message;
            alert.classList.remove("d-none");
        };
    }
}

async function hashPassword(loginPassword) {
    // Encode password as Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(loginPassword);

    // Hash the data with SHA-256
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    // Convert hash to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    return hashHex;
}

loginButton.addEventListener("click", function(event) {
    event.preventDefault();
    login();
});

function register() {
    window.location.href = "../pages/user-register.html";
};

document.addEventListener("DOMContentLoaded", () => {
    registerButton.onclick = register;
});

/*
if (!loginEmail.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    emailError.innerHTML = "Please enter a valid email.";
    return false;
*/