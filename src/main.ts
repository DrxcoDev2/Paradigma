import { app, BrowserWindow } from "electron";
import path from "path";

let mainWindow: BrowserWindow | null = null;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true, // Habilita el uso de IPC en el renderizador
            webviewTag: true, // Aseg�rate de habilitar el tag <webview>
            nodeIntegrationInSubFrames: false
        }
    });

    // Carga el archivo index.html
    mainWindow.loadFile("index.html");

    // Maneja el cierre de la ventana correctamente
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

// For GPU healt
app.enableSandbox();