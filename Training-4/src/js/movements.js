import { createNewMovement, deleteMovement, getMovement, getMovements, updateMovement } from "../services/movementsService";

// Return to Dashboard
document.getElementById("return").addEventListener("click", () => {
    window.location.href = "dashboard.html";
})

// Endpoint for categories
const endPointCategories = "http://localhost:3000/categories"
// Endpoint for movements
const endPointMovements = "http://localhost:3000/movements";

// DOM elements for form
const $formMovements = document.getElementById("form-movements");
const $movementsBody = document.getElementById("movements-body");

// DOM elements for filters
const $filterType = document.getElementById("filter-type");
const $filterCategory = document.getElementById("filter-category");
const $filterStartDate = document.getElementById("filter-start-date");
const $filterEndDate = document.getElementById("filter-end-date");
const $btnCleanFilter = document.getElementById("btn-clean-filter");

let selectCategories = $formMovements.category
let editingMovementId = null; // Variable to know if we are editing
let allMovements = []; // Variable to store all movements without filters

document.addEventListener("DOMContentLoaded", function () {
    showCategories();
    showMovements();
    setupFilterEventListeners();
})

// Setup event listeners for all filters
function setupFilterEventListeners() {
    $filterType.addEventListener("change", applyFilters);
    $filterCategory.addEventListener("change", applyFilters);
    $filterStartDate.addEventListener("change", applyFilters);
    $filterEndDate.addEventListener("change", applyFilters);
    $btnCleanFilter.addEventListener("click", cleanFilters);
}

// Apply all active filters to movements
function applyFilters() {
    let filteredMovements = [...allMovements];

    // Filter by type
    if ($filterType.value) {
        filteredMovements = filteredMovements.filter(movement => 
            movement.type === $filterType.value
        );
    }

    // Filter by category
    if ($filterCategory.value) {
        filteredMovements = filteredMovements.filter(movement => 
            movement.categoryId == $filterCategory.value || movement.category.id == $filterCategory.value
        );
    }

    // Filter by start date
    if ($filterStartDate.value) {
        filteredMovements = filteredMovements.filter(movement => 
            new Date(movement.date) >= new Date($filterStartDate.value)
        );
    }

    // Filter by end date
    if ($filterEndDate.value) {
        filteredMovements = filteredMovements.filter(movement => 
            new Date(movement.date) <= new Date($filterEndDate.value)
        );
    }

    // Render filtered movements
    renderMovements(filteredMovements);
}

// Clean all filters and show all movements
function cleanFilters() {
    $filterType.value = "";
    $filterCategory.value = "";
    $filterStartDate.value = "";
    $filterEndDate.value = "";
    
    // Show all movements
    renderMovements(allMovements);
}

// Form submit handler for creating new movement or editing existing
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
        let response = await updateMovement(editingMovementId, movementData);
        if (response) {
            alert("Movement updated successfully");
            showMovements();
        } else {
            console.error("Error updating movement");
        }
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
    document.querySelector('button[type="submit"]').textContent = "Save Movement";
});

// Event delegation for edit and delete buttons
$movementsBody.addEventListener("click", async function (event) {
    if (event.target.classList.contains("edit-btn")) {
        const movementId = event.target.dataset.id;
        editMovement(movementId);
    }

    if (event.target.classList.contains("delete-btn")) {
        const movementId = event.target.dataset.id;
        if (confirm("Are you sure you want to delete this movement?")) {
            let response = await deleteMovement(movementId);
            if (response) {
                alert("Movement deleted successfully");
                showMovements();
            } else {
                console.error("Error deleting movement");
            }
        }
    }
});

// Show categories in form select and filter select
async function showCategories() {
    selectCategories.innerHTML = ""
    let response = await fetch(endPointCategories)
    let data = await response.json()

    if (data.length > 0) {
        selectCategories.innerHTML += `
            <option value="">-- Select category --</option>
        `
        
        // Also populate the category filter
        $filterCategory.innerHTML = `<option value="">Category</option>`;
    }

    data.forEach(category => {
        selectCategories.innerHTML += `
            <option value="${category.id}">${category.name}</option>
        `
        
        // Add categories to filter
        $filterCategory.innerHTML += `
            <option value="${category.id}">${category.name}</option>
        `
    });
}

// Show movements - fetch and store all movements
export async function showMovements() {
    let movements = await getMovements()
    allMovements = movements; // Store all movements for filtering
    renderMovements(movements);
}

// Render movements in table (separated function for reuse with filters)
function renderMovements(movements) {
    $movementsBody.innerHTML = ""

    if (movements.length === 0) {
        $movementsBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center;">No movements found</td>
            </tr>
        `;
        return;
    }

    for (const movement of movements) {
        $movementsBody.innerHTML += `
            <tr>
                <td>${movement.type}</td>
                <td>${movement.description}</td>
                <td>$${parseFloat(movement.amount).toFixed(2)}</td>
                <td>${new Date(movement.date).toLocaleDateString()}</td>
                <td>${movement.category?.name || 'N/A'}</td>
                <td>
                    <button class="edit-btn" data-id="${movement.id}">Edit</button>
                    <button class="delete-btn" data-id="${movement.id}">Delete</button>
                </td>
            </tr>
        `
    }
}

// Edit movement - load data into form for editing
async function editMovement(id) {
    let movement = await getMovement(id);

    // Load movement data into form
    $formMovements.type.value = movement.type;
    $formMovements.description.value = movement.description;
    $formMovements.amount.value = movement.amount;
    $formMovements.date.value = movement.date;
    $formMovements.category.value = movement.categoryId;

    // Change status to editing mode
    editingMovementId = id;
    document.querySelector('button[type="submit"]').textContent = "Update Movement";
}