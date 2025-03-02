import {app, BrowserWindow } from "electron";
import noti from "./utils/notification";

let mainWindow: BrowserWindow | null;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: __dirname + "/preload.js"
        }
    });

    mainWindow.loadFile("index.html");

});