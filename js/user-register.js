// const loadingHover = document.getElementById("loading-hover");
import { checkRequired, checkValidEmail, checkValidPassword, checkPasswordMatch, checkMaxLength, addValidationEvents, hideAlert } from "./validators.js";
import { messages } from "./messages.js";

const userEmail = document.getElementById("user-email");
const userPassword = document.getElementById("user-pw");
const confirmPassword = document.getElementById("cf-pw");
const userFullname = document.getElementById("user-fullname");
const userDob = document.getElementById("user-dob");
const agreeTerm = document.getElementById("agree-term");
const agreePolicy = document.getElementById("agree-policy");

const emailError = document.getElementById("email-err");
const passwordError = document.getElementById("pw-err");
const confirmPasswordError = document.getElementById("cf-pw-err");
const fullnameError = document.getElementById("fullname-err");
const dobError = document.getElementById("dob-err");
const alert = document.getElementById("alert");
const alertMessage = document.getElementById("alert-message");
const closeAlert = document.getElementById("close-alert");

const registerButton = document.getElementById("register-btn");
const loginButton = document.getElementById("lg-btn");

// Check validate
function validateEmail() {
    return checkRequired(userEmail, emailError, "Email") && 
           checkValidEmail(userEmail, emailError, "email");
};

function validatePassword() {
    return checkRequired(userPassword, passwordError, "Password") &&
		   checkValidPassword(userPassword, passwordError, "Password") &&
		   checkPasswordMatch(userPassword, confirmPassword, confirmPasswordError);
};

function validateConfirmPassword() {
    return checkRequired(confirmPassword, confirmPasswordError, "Confirm password") &&
		   checkPasswordMatch(userPassword, confirmPassword, confirmPasswordError);
};

function validateFullname() {
    return checkMaxLength(userFullname, fullnameError, "Full name", 50);
};

function validateInputs() {
	const isEmailValid = validateEmail();
	const isPasswordValid = validatePassword();
	const isConfirmPasswordValid = validateConfirmPassword();
	const isFullnameValid = validateFullname();
	if (
		isEmailValid === true
		&& isPasswordValid === true
		&& isConfirmPasswordValid === true
		&& isFullnameValid === true
	) {
		return true;
	}
	return false;
};

document.addEventListener("DOMContentLoaded", () => {
	addValidationEvents(userEmail, validateEmail);
	addValidationEvents(userPassword, validatePassword);
	addValidationEvents(confirmPassword, validateConfirmPassword);
	addValidationEvents(userFullname, validateFullname);
    closeAlert.addEventListener("click", hideAlert);
});

async function register() {
	alertMessage.innerHTML = "";
    alert.classList.add("d-none");
	const isInputsValid = validateInputs();
	if (isInputsValid === true) {
		if (!agreeTerm.checked || !agreePolicy.checked) {
			alertMessage.innerHTML = messages.agreeTermPolicyRequired;
			alert.classList.remove("d-none");
		} 
		else {
			const response = await fetch("http://localhost:3000/user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZkYmExYjYzLTkwYjUtNDU5Ni1hMzNkLTg0YjM5ODU4M2RkNCIsInVzZXJuYW1lIjoiQUQxMDAwMDEiLCJpc0FkbWluIjoxLCJpYXQiOjE3MjQwMDIzNDQsImV4cCI6MTczMjY0MjM0NH0.C6lHggs59_A4mJJNpYih83mGL8J5ZD-P2GDpZ2R6rLw",
				},
				body: JSON.stringify({
					email: userEmail.value,
					password: userPassword.value,
					fullname: userFullname.value,
					dob: userDob.value,
				})
			});
			const status = response.status;
			const result = await response.json();
			if (status == 201) {
				window.location.href = "../pages/register-email-sent.html";
			}
			else {
				alertMessage.innerHTML = result.message;
				alert.classList.remove("d-none");
			};
		}
		
	}
};

/*
window.on("load", function () {
	loadingHover.hide();
});
*/

registerButton.addEventListener("click", function (event) {
	event.preventDefault();
	register();
});

loginButton.addEventListener("click", function () {
	window.location.href = "../pages/user-login.html";
});
