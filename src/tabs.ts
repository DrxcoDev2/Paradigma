import { app, BrowserWindow, globalShortcut } from "electron";
import path from "path";
import { exit } from "process";

let mainWindow: BrowserWindow | null = null;
let splashWindow: BrowserWindow | null = null;

app.whenReady().then(() => {

    // Crear la ventana de la pantalla de inicio
    splashWindow = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false, // Sin marco
        alwaysOnTop: true, // Siempre encima
        transparent: true, // Fondo transparente
        webPreferences: {
            preload: __dirname + "/preload.js"
        }
    });

    splashWindow.loadFile('splash.html'); // Cargar el HTML de la pantalla de inicio

    // Crear la ventana principal
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

    // Cargar el archivo index.html
    mainWindow.loadFile("index.html");

    // Maneja el cierre de la ventana correctamente
    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    // Limpiar la cach� y los datos de sesi�n
    const session = mainWindow.webContents.session;
    session.clearCache();
    session.clearData();

    // Registrar el atajo de teclado para cerrar la aplicaci�n
    globalShortcut.register('Ctrl+1', () => {
        console.log('Ctrl + 1 presionado. Cerrando la aplicaci�n...');
        app.quit();  
    });

    // Cerrar el splash despu�s de que mainWindow se haya cargado
    mainWindow.webContents.on('did-finish-load', () => {
        if (splashWindow) {
            splashWindow.close(); // Cierra la pantalla de inicio cuando la ventana principal est� lista
        }
    });

    // Opci�n alternativa: cerrar el splash despu�s de 3 segundos
    setTimeout(() => {
        if (splashWindow) {
            splashWindow.close(); // Cerrar splash despu�s de 3 segundos
        }
    }, 3000); // 3 segundos

});

// Limpiar los atajos cuando la aplicaci�n se cierre
app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

// Cerrar la aplicaci�n cuando todas las ventanas est�n cerradas (excepto en macOS)
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

// Habilitar sandbox (opcional)
app.enableSandbox();
