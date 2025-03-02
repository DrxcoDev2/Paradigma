import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("electron", {
    poing: () => console.log("Ping from Preload")
});

