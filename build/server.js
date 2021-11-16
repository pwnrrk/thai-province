"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var web_1 = __importDefault(require("./app/libs/web"));
dotenv_1.default.config();
process.on('unhandledRejection', function (error) { return console.trace(error); });
process.on('uncaughtException', function (error) { return console.trace(error); });
var web = new web_1.default();
web.start();
