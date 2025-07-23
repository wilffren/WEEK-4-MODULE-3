// Send other view
document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Previene que se recargue la página
  
  window.location.href = './views/movements.html';
});
