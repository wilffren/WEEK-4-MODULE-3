//Validate the login form

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit',  (event) => {
  
  const inputUsername = loginForm.username.value
  const inputPassword = loginForm.password.value;

  login(inputUsername, inputPassword)

  event.preventDefault(); // Prevent the default form submission

})

async function login(inputUsername, inputPassword) {
  let response = await fetch(`http://localhost:3000/user?username=${inputUsername}`,)
  let data = await response.json();

  if (data.length === 0) {
    alert("credenciales incorrectas, revisa el correo o la contraseña")
  } else {
    const userFound = data[0]

    if (userFound.password === inputPassword) {
      localStorage.setItem('currentUser', JSON.stringify(userFound));
      window.location.href = './src/views/dashboard.html';
    } else {
      alert("credenciales incorrectas, revisa el correo o la contraseña");
    }
  }

}