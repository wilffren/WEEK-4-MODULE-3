function checkSession() {
    let checkUser = localStorage.getItem('currentUser');

    if (checkUser === null){
        window.location.href = 'index.html';
    }
}

checkSession();