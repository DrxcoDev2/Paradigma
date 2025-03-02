const webview = document.getElementById("webview");
const urlInput = document.getElementById("url");

document.getElementById("go").addEventListener("click", () => {
    let query = urlInput.value;

    // Si es una b�squeda, redirigimos a Google
    if (query.toLowerCase().includes("traductor") || query.trim() !== "") {
        let searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(query);
        webview.setAttribute("src", searchUrl);
    } else {
        // Si no es un t�rmino de b�squeda, solo cargamos la URL directa
        if (!query.startsWith("http")) {
            query = "https://" + query;
        }
        webview.setAttribute("src", query);
    }
});

document.getElementById("back").addEventListener("click", () => {
    webview.goBack();
});

document.getElementById("forward").addEventListener("click", () => {
    webview.goForward();
});