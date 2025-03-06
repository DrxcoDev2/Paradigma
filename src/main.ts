import { app, BrowserWindow, globalShortcut, session } from "electron";
import path from "path";

let mainWindow: BrowserWindow | null = null;
let splashWindow: BrowserWindow | null = null;

app.whenReady().then(() => {
    // Crear tercera ventana
    let thirdWindow = new BrowserWindow({
        width: 500,
        height: 400,
        webPreferences: {
            nodeIntegration: false
        }
    });

    thirdWindow.loadURL("https://github.com");

    // Crear segunda ventana
    let seconwindow = new BrowserWindow({
        width: 200,
        height: 300,
        webPreferences: {
            nodeIntegration: false
        }
    });

    seconwindow.loadURL("https://youtube.com");

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

// Funci�n para limpiar la cach�
function clearCache() {
    session.defaultSession.clearCache().then(() => {
        console.log("Cach� borrada correctamente.");
    }).catch((error) => {
        console.error("Error al borrar la cach�:", error);
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
