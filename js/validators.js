import { messages } from "./messages.js";

export function openConfirmModal(buttonId, modalId, title, message, redirectUrl) {
    const triggerButton = document.getElementById(buttonId);
    const modalElement = document.getElementById(modalId);

    triggerButton.addEventListener('click', function() {
        document.getElementById('modalLabel').textContent = title;
        document.getElementById('modalMessage').textContent = message;
        const confirmButton = document.getElementById('confirmActionBtn');
        confirmButton.replaceWith(confirmButton.cloneNode(true));
        document.getElementById('confirmActionBtn').addEventListener('click', function() {
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
        });

        const modal = new bootstrap.Modal(modalElement);
        
        modal.show();
    });
};

// External common function
export function hideAlert() {
    alert.classList.add("d-none");
};

export function addValidationEvents(element, validateFunc, events = ["focusout", "keyup"]) {
    events.forEach(event => element.addEventListener(event, validateFunc));
};

// Internal common function
function turnInvalid(input) {
    input.classList.add("is-invalid");
};

function turnValid(input, errorElement) {
    errorElement.innerHTML = "";
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
};

function turnoffCheck(input, errorElement) {
    errorElement.innerHTML = "";
    input.classList.remove("is-invalid");
    input.classList.remove("is-valid");
}

// Check required
export function checkRequired(input, errorElement, fieldName) {
    if (input.type === "checkbox") {
        if (!input.checked) {
            errorElement.innerHTML = messages.required(fieldName);
            turnInvalid(input);
            return false;
        }
    } else {
        if (input.value.trim() === "") {
            errorElement.innerHTML = messages.required(fieldName);
            turnInvalid(input);
            return false;
        }
    }
    
    turnValid(input, errorElement);
    return true;
};

// Check max-length
export function checkMaxLength(input, errorElement, fieldName, maxLength) {
    const inputValue = input.value.trim()

    if (inputValue === "") {
        turnoffCheck(input, errorElement)
        return true;
    }

    if (inputValue.length > maxLength) {
        errorElement.innerHTML = messages.maxLength(fieldName, maxLength);
        turnInvalid(input);
        return false;
    }
    
    else {
        turnValid(input, errorElement);
        return true;
    }
};

// Check min-length
export function checkMinLength(input, errorElement, fieldName, minLength) {
    const inputValue = input.value.trim()

    if (inputValue === "") {
        turnoffCheck(input, errorElement)
        return true;
    }

    if (inputValue < minLength) {
        errorElement.innerHTML = messages.minLength(fieldName, minLength);
        turnInvalid(input);
        return false;
    }
    
    else {
        turnValid(input, errorElement);
        return true;
    }
};

// Check valid email
export function checkValidEmail(input, errorElement, fieldName) {
    const inputValue = input.value.trim()
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (inputValue === "") {
        errorElement.innerHTML = "";
        input.classList.remove("is-invalid");
        return true;
    }

    if (!regex.test(inputValue)) {
        errorElement.innerHTML = messages.invalid(fieldName);
        turnInvalid(input);
        return false;
    }

    if (inputValue.length > 255) {
        errorElement.innerHTML = messages.maxLength(fieldName, 255);
        turnInvalid(input);
        return false;
    }

    else {
        turnValid(input, errorElement);
        return true;
    }
};

// Check valid password
export function checkValidPassword(input, errorElement, fieldName) {
    const inputValue = input.value.trim();

    if (inputValue.length < 8) {
        errorElement.innerHTML = messages.maxLength(fieldName, 8);
        turnInvalid(input);
        return false;
    }

    if (!/\d/.test(inputValue)) {
        errorElement.innerHTML = messages.requireNumber(fieldName);
        turnInvalid(input);
        return false;
    }

    if (!/[a-zA-Z]/.test(inputValue)) {
        errorElement.innerHTML = messages.requireLetter(fieldName);
        turnInvalid(input);
        return false;
    }
    
    else {
        turnValid(input, errorElement);
        return true;
    }
};

export function checkPasswordMatch(passwordInput, confirmPasswordInput, errorElement) {
    const pwInputValue = passwordInput.value.trim()
    const cfpwInputValue = confirmPasswordInput.value.trim()

    if (cfpwInputValue === "") {
        errorElement.innerHTML = "";
        input.classList.remove("is-invalid");
        return true;
    }

    if (pwInputValue !== cfpwInputValue) {
        errorElement.innerHTML = messages.passwordMismatch();
        turnInvalid(confirmPasswordInput);
        return false;
    } 
    
    else {
        turnValid(confirmPasswordInput, errorElement);
        return true;
    }
};

// Check valid tel
export function checkValidTel(input, errorElement, fieldName) {
    const tel = input.value.trim();
    const regex = /^0\d*$/;

    if (tel === "") {
        errorElement.innerHTML = "";
        input.classList.remove("is-invalid");
        return true;
    }

    if (!regex.test(tel)) {
        errorElement.innerHTML = messages.invalid(fieldName);
        turnInvalid(input);
        return false;
    }

    if (tel.length < 10 ) {
        errorElement.innerHTML = messages.minLength(fieldName, 10);
        turnInvalid(input);
        return false;
    }

    if (tel.length > 11) {
        errorElement.innerHTML = messages.maxLength(fieldName, 11);
        turnInvalid(input);
        return false;
    }
    
    else {
        turnValid(input, errorElement);
        return true;
    }
};

// function validateDate() {
//     // Kiểm tra định dạng chuỗi
//     const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
//     const match = dateString.match(regex);
//     if (!match) {
//         return false;
//     }
//     const [, day, month, year] = match.map(Number);

//     // Kiểm tra ngày, tháng, và năm hợp lệ
//     if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) {
//         return false;
//     }

//     // Kiểm tra số ngày hợp lệ trong tháng
//     const daysInMonth = new Date(year, month, 0).getDate();
//     return day <= daysInMonth;
// }