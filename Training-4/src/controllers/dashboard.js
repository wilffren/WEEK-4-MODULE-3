//button for log out app

const $btnLogOut = document.getElementById('btn-logout');

$btnLogOut.addEventListener('click', () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
})

//button for go categories
const $btnCategories = document.getElementById('btn-categories');

$btnCategories.addEventListener('click', () => {
    window.location.href = "categories.html";
})

//button for go movements
const $btnMovements = document.getElementById('btn-movements');
$btnMovements.addEventListener('click', () => {
    window.location.href = "movements.html";
})

//button for go reports

const $btnReports = document.getElementById("btn-reports");
$btnReports.addEventListener("click", () => {
    window.location.href = "report.html";
})