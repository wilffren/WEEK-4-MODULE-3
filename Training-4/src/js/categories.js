//Return to Dashboard
document.getElementById("return").addEventListener("click", () => {
    window.location.href = "dashboard.html";
})

// categories endpoint 
const endPoint = "http://localhost:3000/categories";

//button for save categories
const btnCategorie = document.getElementById("btn-categorie");
const inputText = document.getElementById("categorie");


btnCategorie.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission

    const newCategory = {
        name: inputText.value
    }
    saveCategorie(newCategory);
});

// Fetch categories from the server

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
