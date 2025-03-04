const AddFavbutton = document.getElementById('add-fav') as HTMLButtonElement;

// Al cargar la página, verifica si el estado está guardado en localStorage
document.addEventListener('DOMContentLoaded', () => {
    const storedState = localStorage.getItem("favButtonState");
    console.log("Estado almacenado en localStorage al cargar:", storedState);

    if (storedState === "changed") {
        AddFavbutton.classList.add('changed');
        console.log("El botón tiene la clase 'changed' al cargar.");
    }
});

// Evento para cuando el botón es presionado
AddFavbutton.addEventListener("click", () => {
    console.log("Botón presionado. Estado actual de la clase 'changed':", AddFavbutton.classList.contains('changed'));
    
    AddFavbutton.classList.toggle('changed');
    
    // Guardar el estado actual en localStorage
    if (AddFavbutton.classList.contains('changed')) {
        console.log("Guardando el estado 'changed' en localStorage");
        localStorage.setItem("favButtonState", "changed");
    } else {
        console.log("Guardando el estado vacío en localStorage");
        localStorage.setItem("favButtonState", "");
    }
});
