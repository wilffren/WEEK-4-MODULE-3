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

// saved categories function
async function saveCategorie(newCategory) {
    try {
        let response = await fetch(endPoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCategory)
        });

        if(response.ok){
            alert("Category created successfully!");
            inputText.value = ""; 
           
        } else {
            alert("Error creating category");
        }
    } catch (error) {
        console.error('Error saving category:', error);
        alert("Error saving category");
    }
}

//load the categories when the page loads
async function loadCategories() {
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

// Update category function
async function updateCategory(categoryId, newName) {
    try {
        let response = await fetch(`${endPoint}/${categoryId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: newName })
        });

        if(response.ok){
            alert("Category updated successfully!");
            loadCategories(); // Reload the list
        } else {
            alert("Error updating category");
        }
    } catch (error) {
        console.error('Error updating category:', error);
        alert("Error updating category");
    }
}

// Delete category function
async function deleteCategory(categoryId, categoryName) {
    const confirmDelete = confirm(`Are you sure you want to delete "${categoryName}"?`);
    
    if (!confirmDelete) return;

    try {
        let response = await fetch(`${endPoint}/${categoryId}`, {
            method: "DELETE"
        });

        if(response.ok){
            alert("Category deleted successfully!");
            loadCategories(); // Reload the list
        } else {
            alert("Error deleting category");
        }
    } catch (error) {
        console.error('Error deleting category:', error);
        alert("Error deleting category");
    }
}

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