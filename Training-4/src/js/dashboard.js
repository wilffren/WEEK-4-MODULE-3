const $btnLogOut = document.getElementById('btn-logout');

$btnLogOut.addEventListener('click', () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
})
