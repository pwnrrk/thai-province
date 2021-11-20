"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var web_1 = __importDefault(require("./app/libs/web"));
var app_1 = require("firebase/app");
dotenv_1.default.config();
process.on("unhandledRejection", function (error) { return console.trace(error); });
process.on("uncaughtException", function (error) { return console.trace(error); });
var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "thai-province.firebaseapp.com",
    projectId: "thai-province",
    storageBucket: "thai-province.appspot.com",
    messagingSenderId: "804710319647",
    appId: "1:804710319647:web:e48107ee9a023f2489372a",
    measurementId: "G-8DZZQ0YDDK",
};
(0, app_1.initializeApp)(firebaseConfig);
var web = new web_1.default();
web.start();
