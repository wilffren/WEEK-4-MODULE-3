import { deleteCategory, saveCategorie, updateCategory, } from "../services/categoriesService";

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

    const categoryName = inputText.value.trim();
    if (!categoryName) {
        alert("Please enter a category name");
        return;
    }

    const newCategory = {
        name: categoryName
    }
    saveCategorie(newCategory);
});


//load the categories when the page loads
export async function loadCategories() {
    try {
        const response = await fetch(endPoint);
        const data = await response.json();
        
        listCategories.innerHTML = ""; // Clear previous list
        
        if (data.length === 0) {
            const emptyMessage = document.createElement("li");
            emptyMessage.textContent = "No categories found";
            emptyMessage.style.textAlign = "center";
            emptyMessage.style.color = "#6b7280";
            emptyMessage.style.fontStyle = "italic";
            listCategories.appendChild(emptyMessage);
            return;
        }
        
        data.forEach((category, index) => {
            const listItem = document.createElement("li");
            listItem.className = "category-item";
            
            // Create category content container
            const categoryContent = document.createElement("div");
            categoryContent.className = "category-content";
            
            // Category name
            const categoryName = document.createElement("span");
            categoryName.textContent = category.name;
            categoryName.className = "category-name";
            
            // Buttons container
            const buttonsContainer = document.createElement("div");
            buttonsContainer.className = "category-buttons";
            
            // Edit button
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.className = "edit-btn";
            // Usar index si no hay ID, o category.id si existe
            const categoryId = category.id || index;
            editButton.onclick = () => editCategory(categoryId, category.name);
            
            // Delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-btn";
            deleteButton.onclick = () => deleteCategory(categoryId, category.name);
            
            // Append elements
            buttonsContainer.appendChild(editButton);
            buttonsContainer.appendChild(deleteButton);
            
            categoryContent.appendChild(categoryName);
            categoryContent.appendChild(buttonsContainer);
            
            listItem.appendChild(categoryContent);
            listCategories.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        listCategories.innerHTML = "<li style='color: red; text-align: center;'>Error loading categories</li>";
    }
}

//get categories button
const getCategory = document.getElementById("get-category");
getCategory.addEventListener("click", loadCategories);

//load categories
document.addEventListener("DOMContentLoaded", () => {
    loadCategories(); // load categories when the page is ready
});


// Function to edit category (prompts for new name)
function editCategory(categoryId, currentName) {
    const newName = prompt(`Edit category name:`, currentName);
    
    if (newName === null) return; // User cancelled
    
    if (newName.trim() === "") {
        alert("Category name cannot be empty");
        return;
    }
    
    if (newName.trim() === currentName) {
        alert("No changes made");
        return;
    }
    
    updateCategory(categoryId, newName.trim());
}