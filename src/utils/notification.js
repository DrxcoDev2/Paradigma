"use strict";
const electron_1 = require("electron");
const noti = new electron_1.Notification({
    title: "Hola",
    body: "Bienvenid@ a Paradigma"
}).show();
module.exports = noti;
