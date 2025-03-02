import { app, BrowserWindow, globalShortcut} from "electron";
import path from "path";
import { exit } from "process";

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

    const session = mainWindow.webContents.session;
    session.clearCache();
    session.clearData();

    globalShortcut.register('Ctrl+1', () => {
        console.log('Ctrl + 1 presionado. Cerrando la aplicaci�n...');
        app.quit();  
    });
});

// Limpiar el atajo 
app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

// For GPU healt
app.enableSandbox();

