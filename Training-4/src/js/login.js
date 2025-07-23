//Validate the login form

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = loginForm.username.value
    const password = loginForm.password.value;

    login(username, password)
}) 

async function login(username, password) {
  let response = await fetch(`http://localhost:3000/user?username=${username}`, )
  let data = await response.json();
  
  if (data.length === 0) {
        alert("credenciales incorrectas, revisa el correo o la contraseña")
    } else {
        const userFound = data[0]

        if (userFound.password === password) {
            localStorage.setItem('user', JSON.stringify(userFound));
            window.location.href = 'index.html';
        } else {
            alert("credenciales incorrectas, revisa el correo o la contraseña");
        }
      }
      
}