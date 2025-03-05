interface FavoriteRequest {
    url: string;
    fav: boolean;  // Agregar 'fav' aqu�
}

document.addEventListener("DOMContentLoaded", function() {
    const favBtn = document.getElementById("add-fav") as HTMLButtonElement;
    favBtn.addEventListener("click", sendFavorite);
});

async function sendFavorite(): Promise<void> {
    const urlInput = document.getElementById("url") as HTMLInputElement;
    
    const url: string = urlInput.value.trim();

    if (url) {
        console.log("Url detectada");
    }

    if (!url) {
        console.error("Por favor, introduzca una URL");
        return;
    }

    // Agregar el campo 'fav' con un valor por defecto (true)
    const favoriteData: FavoriteRequest = { 
        url,
        fav: true  // Valor por defecto para 'fav'
    };

    try {
        const response = await fetch("http://localhost:3020/favorites", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(favoriteData)
        });

        const data = await response.json();

        if (response.ok) {
            console.log(`Guardado en favoritos: ${data.url}`);
        } else {
            console.error(`No se ha guardado ${data.error}`);
        }
    } catch (error) {
        console.error("Error en la solicitud: ", error);
    }
}
