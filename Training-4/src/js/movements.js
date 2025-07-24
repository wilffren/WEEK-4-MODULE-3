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

document.addEventListener("DOMContentLoaded", function () {
    showCategories();
    showMovements();
})                                    
    
//For boton to create a new movement
$formMovements.addEventListener("submit", function (event)  {
    event.preventDefault();

    const newMovement = {
        type: $formMovements.type.value,
        description: $formMovements.description.value,
        amount: $formMovements.amount.value,
        date: $formMovements.date.value,
        categoryId: $formMovements.category.value
    }

    createNewMovement(newMovement)
    $formMovements.reset();
});


//get the movements
async function getMovements() {
    let response = await fetch(`${endPointMovements}?_embed=category`)
    let data = await response.json();
    return data;
}
//show categories

async function showCategories() {
    selectCategories.innerHtml = ""
    let response = await fetch(endPointCategories)
    let data = await response.json()

    if (data.length > 0) {
       selectCategories.innerHtml += `
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

async function showMovements() {
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
              <button class="btn-edit" data-id="${movement.id}">Edit</button>
              <button class="btn-delete" data-id="${movement.id}">Delete</button>
            </td>
            </tr>
        `
    }
}



//create a new movement
async function createNewMovement(newMovement) {
    let response = await fetch(endPointMovements, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMovement)
    })

    if (response.ok) {
        alert("Movement created successfully")
    } else {
        console.error("Error creating movement")
    }

    showMovements();
}