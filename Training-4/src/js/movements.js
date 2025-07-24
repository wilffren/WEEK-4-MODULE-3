//Return to Dashboard
document.getElementById("return").addEventListener("click", () => {
    window.location.href = "dashboard.html";
})


//endpoint for movements
const endPointMovements = "http://localhost:3000/movements";
// function to save movements

const $formMovements = document.getElementById("form-movements");
$formMovements.addEventListener("submit",  (event) => {
    event.preventDefault();
         })                                       
    
