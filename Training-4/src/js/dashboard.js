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