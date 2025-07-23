function checkSession(){
    let checkUser = localStorage.getItem('user');

    if (checkUser === null){
        window.location.href = 'login.html';
    }
}

checkSession();