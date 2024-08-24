// const loadingHover = document.getElementById("loading-hover");
import { checkRequired, checkValidTel, checkValidEmail, checkValidPassword, addValidationEvents, checkMaxLength, openConfirmModal, hideAlert } from "./validators.js";
import { messages } from "./messages.js";

const adminFullname = document.getElementById("admin-fullname");
const adminTel = document.getElementById("admin-tel");
const adminEmail = document.getElementById("admin-email");
const adminRole = document.getElementById("admin-role");
const adminUsername = document.getElementById("admin-username");
const adminPassword = document.getElementById("admin-pw");

const fullnameError = document.getElementById("fullname-err");
const telError = document.getElementById("tel-err");
const emailError = document.getElementById("email-err");
const roleError = document.getElementById("role-err");
const usernameError = document.getElementById("username-err");
const passwordError = document.getElementById("pw-err");
const alert = document.getElementById("alert");
const alertMessage = document.getElementById("alert-message");
const closeAlert = document.getElementById("close-alert");

const createButton = document.getElementById("create-btn");
const loadingHover = document.getElementById("loading-hover");
const cancelButton = document.getElementById("cancel-btn");

// Check validate
function validateFullname() {
    return checkMaxLength(adminFullname, fullnameError, "Full name", 50);
};

function validateTel() {
    return checkValidTel(adminTel, telError, "Phone number");
};

function validateEmail() {
    return checkRequired(adminEmail, emailError, "Email") && 
           checkValidEmail(adminEmail, emailError, "Email");
};

function validateRole() {
    return checkRequired(adminRole, roleError, "Role");
};

function validateUsername() {
    return checkRequired(adminUsername, usernameError, "Username") &&
		   checkMaxLength(adminUsername, usernameError, "Username", 50);
};

function validatePassword() {
    return checkRequired(adminPassword, passwordError, "Password") &&
		   checkValidPassword(adminPassword, passwordError, "Password");
};

function validateInputs() {
	const isFullnameValid = validateFullname();
	const isTelValid = validateTel();
	const isEmailValid = validateEmail();
	const isRoleValid = validateRole();
	const isUsernameValid = validateUsername();
	const isPasswordValid = validatePassword();
	if (
		isFullnameValid === true
		&& isTelValid === true
		&& isEmailValid === true
		&& isRoleValid === true
		&& isUsernameValid === true
		&& isPasswordValid === true
	) {
		return true;
	}
	return false;
};

document.addEventListener("DOMContentLoaded", () => {
	addValidationEvents(adminFullname, validateFullname);
    addValidationEvents(adminTel, validateTel);
    addValidationEvents(adminEmail, validateEmail);
    addValidationEvents(adminRole, validateRole, ["focusout", "change"]);
    addValidationEvents(adminUsername, validateUsername);
    addValidationEvents(adminPassword, validatePassword);
    closeAlert.addEventListener("click", hideAlert);
});

async function create() {
	alertMessage.innerHTML = "";
    alert.classList.add("d-none");
	const isInputsValid = validateInputs();
	if (isInputsValid === true) {
		loadingHover.style.display = "none";
		const response = await fetch("http://localhost:3000/admin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZkYmExYjYzLTkwYjUtNDU5Ni1hMzNkLTg0YjM5ODU4M2RkNCIsInVzZXJuYW1lIjoiQUQxMDAwMDEiLCJpc0FkbWluIjoxLCJpYXQiOjE3MjQwMDIzNDQsImV4cCI6MTczMjY0MjM0NH0.C6lHggs59_A4mJJNpYih83mGL8J5ZD-P2GDpZ2R6rLw",
			},
			body: JSON.stringify({
				fullname: adminFullname.value,
				tel: adminTel.value,
				email: adminEmail.value,
				role: adminRole.value,
				username: adminUsername.value,
				password: adminPassword.value,
			})
		});
		const status = response.status;
		const result = await response.json();
		if (status == 201) {
			loadingHover.style.display = "none";
			window.location.href = "../pages/admin-view.html";
			alert.classList.replace("alert-danger", "alert-success");
			alert.classList.remove("d-none");
		}
		else {
			alertMessage.innerHTML = result.message;
			loadingHover.style.display = "none";
			alert.classList.remove("d-none");
		};
	}
};

createButton.addEventListener("click", function (event) {
	event.preventDefault();
	create();
});

fetch('../js/components/confirm-modal.html')
.then(response => response.text())
.then(html => {
	document.body.insertAdjacentHTML('beforeend', html);
	openConfirmModal("cancel-btn", "confirmModalTemplate", "Confirm cancel", messages.cancelConfirm, "../pages/admin-list.html");
});

