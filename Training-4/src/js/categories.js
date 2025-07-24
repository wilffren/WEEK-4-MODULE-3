//Return to Dashboard
document.getElementById("return").addEventListener("click", () => {
    window.location.href = "dashboard.html";
})

// categories endpoint 
const endPoint = "http://localhost:3000/categories";

//button for save categories
const btnCategorie = document.getElementById("btn-categorie");
const inputText = document.getElementById("categorie");

//list of categories
const listCategories = document.getElementById("listCategories");

btnCategorie.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission

    const newCategory = {
        name: inputText.value
    }
    saveCategorie(newCategory);
});

// saved categories function

async function saveCategorie(newCategory) {
    let response = await fetch(endPoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCategory)
    });

    if(response.ok){
        alert("categorie created")
    }
}

//load the categories when the page loads
async function loadCategories() {
    try {
        const response = await fetch(endPoint);
        const data = await response.json();
        
        listCategories.innerHTML = ""; // Clear previous list
        data.forEach(category => {
            const listItem = document.createElement("li");
            listItem.textContent = category.name;
            listCategories.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

//Get the categories
const getCategory = document.getElementById("get-category");

getCategory.addEventListener("click", async () => {
  fetch(endPoint)
    .then(response => response.json())
    .then(data => {
        listCategories.innerHTML = ""; // Clear previous list
        data.forEach(category => {
            const listItem = document.createElement("li");
            listItem.textContent = category.name;
            listCategories.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error fetching categories:', error));
})

//load categories
document.addEventListener("DOMContentLoaded", () => {
    loadCategories(); // load categories when the page is ready
});