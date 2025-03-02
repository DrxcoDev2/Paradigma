const webview: HTMLElement | null = document.getElementById("webview");
const urlInput: HTMLInputElement | null = document.getElementById("url") as HTMLInputElement;

document.getElementById("go")?.addEventListener("click", () => {
    let query: string = urlInput.value;

    if (query.toLowerCase().includes("traductor") || query.trim() !== "") {
        let searchUrl: string = "https://www.google.com/search?q=" + encodeURIComponent(query);
        webview?.setAttribute("src", searchUrl);
    } else {
        if (!query.startsWith("http")) {
            query = "https://" + query;
        }
        webview?.setAttribute("src", query);
    }
});

document.getElementById("back")?.addEventListener("click", () => {
    (webview as any).goBack();
});

document.getElementById("forward")?.addEventListener("click", () => {
    (webview as any).goForward();
});