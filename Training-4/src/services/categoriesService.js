import { loadCategories } from "../js/categories";

// categories endpoint 
const endPoint = "http://localhost:3000/categories";

// saved categories function
export async function saveCategorie(newCategory) {
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

// Update category function
export async function updateCategory(categoryId, newName) {
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
export async function deleteCategory(categoryId, categoryName) {
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