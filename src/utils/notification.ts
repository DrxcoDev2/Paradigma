import { Notification } from "electron";

const noti = new Notification({
    title: "Hola",
    body: "Bienvenid@ a Paradigma"
}).show();

export = noti;