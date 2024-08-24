import { checkRequired } from "./validators.js";

const loginButton = document.getElementById("lg-btn");
const loginUsername = document.getElementById("lg-username");
const loginPassword = document.getElementById("lg-pw");

const usernameError = document.getElementById("username-err");
const passwordError = document.getElementById("pw-err");
const alert = document.getElementById("alert");
const alertMessage = document.getElementById("alert-message");
const closeAlert = document.getElementById("close-alert");

function validateUsername() {
    return checkRequired(loginUsername, usernameError, "Username");
};

document.addEventListener("DOMContentLoaded", () => {
    loginUsername.onkeyup = validateUsername;
});

function validatePassword() {
    return checkRequired(loginPassword, passwordError, "Password");
};

document.addEventListener("DOMContentLoaded", () => {
    loginPassword.onkeyup = validatePassword;
});

function validateInputs() {
    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();
    if (isUsernameValid === true && isPasswordValid === true) {
        return true;
    }
    return false;
};

function hideAlert() {
    alert.classList.add("d-none");
}

document.addEventListener("DOMContentLoaded", () => {
    closeAlert.onclick = hideAlert;
});

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
};

async function login() {
    alertMessage.innerHTML = "";
    alert.classList.add("d-none");
    const isInputsValid = validateInputs();
    if (isInputsValid === true) {
        const hashedPassword = await hashPassword(loginPassword);
        const response = await fetch("http://localhost:3000/auth/admin-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: loginUsername.value,
                password: hashedPassword,
                expiresInMins: 30,
            })
        });
        const status = response.status;
        const result = await response.json();
        if (status == 200) {
            window.location.href = "../pages/admin-list.html";
        }
        else {
            alertMessage.innerHTML = result.message;
            alert.classList.remove("d-none");
        };
    }
};

loginButton.addEventListener("click", function(event) {
    event.preventDefault();
    login();
});