interface FavoriteRequest {
    url: string;
    fav: boolean;
}

document.addEventListener("DOMContentLoaded", function() {
    const favBtn = document.getElementById("add-fav") as HTMLButtonElement;
    const deleteBtn = document.getElementById("delete-fav") as HTMLButtonElement;

    favBtn.addEventListener("click", sendFavorite);
    deleteBtn.addEventListener("click", deleteFavorite);
});

async function sendFavorite(): Promise<void> {
    const urlInput = document.getElementById("url") as HTMLInputElement;
    const url: string = urlInput.value.trim();

    if (!url) {
        console.error("Por favor, introduzca una URL");
        return;
    }

    // Crear objeto FavoriteRequest
    const favoriteData: FavoriteRequest = { 
        url,
        fav: true  
    };

    try {
        const response = await fetch("http://localhost:3020/favorites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(favoriteData)
        });

        const data = await response.json();

        if (response.ok) {
            console.log(`Guardado en favoritos: ${data.url}`);
        } else {
            console.error(`No se ha guardado: ${data.error}`);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}

async function deleteFavorite(): Promise<void> {
    const urlInput = document.getElementById("url") as HTMLInputElement;
    const url: string = encodeURIComponent(urlInput.value.trim());

    if (!url) {
        console.error("Por favor, introduzca una URL para eliminar");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3020/favorites?url=${url}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            const data = await response.json();
            console.error(`No se pudo eliminar: ${data.error}`);
            return;
        }

        console.log(`Eliminado de favoritos: ${url}`);
    } catch (error) {
        console.error("Error en la solicitud de eliminaci�n:", error);
    }
}
