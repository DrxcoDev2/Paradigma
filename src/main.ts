import { app, BrowserWindow, globalShortcut, session } from "electron";
import path from "path";


let mainWindow: BrowserWindow | null = null;
let splashWindow: BrowserWindow | null = null;


app.whenReady().then(() => {
    splashWindow = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false,
        alwaysOnTop: true,
        transparent: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"), // Usamos un preload script
        }
    });

    splashWindow.loadFile("splash.html");

    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false, // Desactivamos nodeIntegration
            contextIsolation: true, // Aseguramos el aislamiento de contexto
            webviewTag: true,
        }
    });

    mainWindow.loadFile("index.html");

    mainWindow.on("closed", () => {
        mainWindow = null;

    });



    mainWindow.webContents.once("did-finish-load", () => {
        if (splashWindow) splashWindow.close();
    });

    globalShortcut.register("Ctrl+1", () => {
        app.quit();
    });

    
});

app.on("will-quit", () => {
    globalShortcut.unregisterAll();
    clearCache();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

function clearCache() {
    session.defaultSession.clearCache().then(() => {
        console.log("Cach� borrada correctamente.");
    }).catch((error) => {
        console.error("Error al borrar la cach�:", error);
    });
}

app.enableSandbox();
