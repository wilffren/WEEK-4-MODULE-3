import { createNewMovement, deleteMovement, getMovement, getMovements, updateMovement } from "../services/movementsService";

//Return to Dashboard
document.getElementById("return").addEventListener("click", () => {
    window.location.href = "dashboard.html";
})

//endpoint for categories
const endPointCategories = "http://localhost:3000/categories"
//endpoint for movements
const endPointMovements = "http://localhost:3000/movements";

// DOM
const $formMovements = document.getElementById("form-movements");
const $movementsBody = document.getElementById("movements-body");

let selectCategories = $formMovements.category
let editingMovementId = null; // Variable para saber si estamos editando

document.addEventListener("DOMContentLoaded", function () {
    showCategories();
    showMovements();
})

//For boton to create a new movement or edit existing
$formMovements.addEventListener("submit", async function (event) {
    event.preventDefault();

    const movementData = {
        type: $formMovements.type.value,
        description: $formMovements.description.value,
        amount: $formMovements.amount.value,
        date: $formMovements.date.value,
        categoryId: $formMovements.category.value
    }

    if (editingMovementId) {
        updateMovement(editingMovementId, movementData);
    } else {
        let response = await createNewMovement(movementData);
        if (response) {
            alert("Movement created successfully")
            showMovements();
        } else {
            console.error("Error creating movement")
        }
    }

    $formMovements.reset();
    editingMovementId = null;
    document.querySelector('button[type="submit"]').textContent = "Create Movement";
});

// Event delegation para botones de editar y eliminar
$movementsBody.addEventListener("click", function (event) {
    if (event.target.classList.contains("edit-btn")) {
        const movementId = event.target.dataset.id;
        editMovement(movementId);
    }

    if (event.target.classList.contains("delete-btn")) {
        const movementId = event.target.dataset.id;
        deleteMovement(movementId);
    }
});

//show categories
async function showCategories() {
    selectCategories.innerHTML = ""
    let response = await fetch(endPointCategories)
    let data = await response.json()

    if (data.length > 0) {
        selectCategories.innerHTML += `
            <option disabled>-- Select --</option>
        `
    }

    data.forEach(category => {
        selectCategories.innerHTML += `
            <option value="${category.id}">${category.name}</option>
        `
    });
}

//show movements
export async function showMovements() {
    let movements = await getMovements()

    $movementsBody.innerHTML = ""

    for (const movement of movements) {
        $movementsBody.innerHTML += `
            <tr>
                <td>${movement.type}</td>
                <td>${movement.description}</td>
                <td>${movement.amount}</td>
                <td>${movement.date}</td>
                <td>${movement.category.name}</td>
                <td>
              <button class="edit-btn" data-id="${movement.id}">Edit</button>
              <button class="delete-btn" data-id="${movement.id}">Delete</button>
            </td>
            </tr>
        `
    }
}

//edit movement - load data for movements
async function editMovement(id) {
    let movement = await getMovement(id);

    // changes dta for form movements
    $formMovements.type.value = movement.type;
    $formMovements.description.value = movement.description;
    $formMovements.amount.value = movement.amount;
    $formMovements.date.value = movement.date;
    $formMovements.category.value = movement.categoryId;

    // Change status to editing
    editingMovementId = id;
    document.querySelector('button[type="submit"]').textContent = "Update Movement";
}


