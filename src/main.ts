import { app, BrowserWindow, globalShortcut, session } from "electron";
import path from "path";

let mainWindow: BrowserWindow | null = null;
let splashWindow: BrowserWindow | null = null;

app.whenReady().then(() => {
    // Crear ventana de splash
    splashWindow = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false,
        alwaysOnTop: true,
        transparent: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        }
    });

    splashWindow.loadFile("splash.html");

    // Crear ventana principal
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
            webviewTag: true,
        }
    });

    mainWindow.loadFile("index.html");

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    // Cerrar splash cuando la ventana principal termine de cargar
    mainWindow.webContents.once("did-finish-load", () => {
        if (splashWindow) splashWindow.close();
    });

    // Registrar atajo de teclado
    globalShortcut.register('Ctrl+5', () => {
        if (splashWindow) {
            splashWindow.loadFile('splash.html');  // Volver a cargar el archivo splash.html
        }
    });

    globalShortcut.register('Ctrl+1', () => {
        mainWindow?.close();
        clearData();
    });
    
});

app.on("will-quit", () => {
    globalShortcut.unregisterAll();

});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

// Función para limpiar la caché
function clearCache() {
    session.defaultSession.clearCache().then(() => {
        console.log("Caché borrada correctamente.");
    }).catch((error) => {
        console.error("Error al borrar la caché:", error);
    });
}

function clearData() {
    session.defaultSession.clearData().then(() => {
        console.log("Datos eliminados");
    }).catch((error) => {
        console.error("Error al eliminar los datos:", error);
    });
}

app.enableSandbox(); // Solo habilitar sandbox si se necesita
