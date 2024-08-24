// const loadingHover = document.getElementById("loading-hover");

const adminFullname = document.getElementById("admin-fullname");
const adminTel = document.getElementById("admin-tel");
const adminEmail = document.getElementById("admin-email");
const adminRole = document.getElementById("admin-role");
const adminUsername = document.getElementById("admin-username");

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')

const createButton = document.getElementById("create-btn");
const searchButton = document.getElementById("search-btn");
const clearButton = document.getElementById("clear-btn");
const importButton = document.getElementById("import-btn");
const downloadButton = document.getElementById("download-btn");

/*
window.on('load', function () {
  	loadingHover.hide();
});
*/

const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

createButton.addEventListener("click", function () {
  	window.location.href = "../pages/admin-create.html";
});

