const webview = document.getElementById("webview") as WebviewElement;
const backButton = document.getElementById("back") as HTMLButtonElement;
const forwardButton = document.getElementById("forward") as HTMLButtonElement;
const urlInput = document.getElementById("url") as HTMLInputElement;
const goButton = document.getElementById("go") as HTMLButtonElement;
const weatherButton = document.getElementById("weather") as HTMLButtonElement;

// Funci�n para cargar una URL en el WebView
function loadURL(url: string): void {
    if (!url.startsWith("http")) {
        url = "https://" + url; // Agrega "https://" si falta
    }
    webview.src = url;
    urlInput.value = url; // Actualiza la barra de direcciones
}

// Manejadores de eventos para los botones de navegaci�n
backButton.addEventListener("click", () => {
    if (webview.contentWindow?.history.length) {
        webview.contentWindow?.history.back();
    }
});

forwardButton.addEventListener("click", () => {
    if (webview.contentWindow?.history.length) {
        webview.contentWindow?.history.forward();
    }
});

weatherButton.addEventListener("click", () => {
    loadURL("https://www.weather.com/es-ES/tiempo/hoy/");
});

// Cargar la URL ingresada en la barra de direcciones
goButton.addEventListener("click", () => {
    loadURL(urlInput.value);
});

// Permitir que el usuario presione "Enter" en la barra de direcciones
urlInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        loadURL(urlInput.value);
    }
});

// Cargar Google por defecto

