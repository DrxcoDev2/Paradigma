import { app, BrowserWindow, globalShortcut } from "electron";
import path from "path";
import { TabsManager } from "./tabs";  // Importar el sistema de pesta�as

let mainWindow: BrowserWindow | null = null;
let splashWindow: BrowserWindow | null = null;
let tabsManager: TabsManager | null = null;

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
            nodeIntegrationInSubFrames: false,
            webSecurity: false
        }
    });

    // Cargar el archivo index.html
    mainWindow.loadFile("index.html");

    // Maneja el cierre de la ventana correctamente
    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    // Crear una instancia del gestor de pesta�as
    tabsManager = new TabsManager(mainWindow);

    // Crear una pesta�a de ejemplo
    tabsManager.createTab(); // Cargar Google en la primera pesta�a

    // Cerrar el splash despu�s de que mainWindow se haya cargado
    mainWindow.webContents.on('did-finish-load', () => {
        if (splashWindow) {
            splashWindow.close(); // Cierra la pantalla de inicio cuando la ventana principal est� lista
        }
    });

    // Registrar el atajo de teclado para cerrar la aplicaci�n
    globalShortcut.register('Ctrl+1', () => {
        console.log('Ctrl + 1 presionado. Cerrando la aplicaci�n...');
        app.quit();
    });

    // Registrar el atajo de teclado para crear una nueva pesta�a
    globalShortcut.register('Ctrl+T', () => {
        if (tabsManager) {
            tabsManager.createTab(); // Crear una nueva pesta�a
        }
    });

    // Registrar el atajo de teclado para cerrar todas las pesta�as
    globalShortcut.register('Ctrl+W', () => {
        if (tabsManager) {
            tabsManager.closeAllTabs(); // Cerrar todas las pesta�as
        }
    });

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
