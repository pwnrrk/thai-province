"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __importDefault(require("../app/kernel/router"));
router_1.default.get("/", "home@index", false);
router_1.default.get("/hello", "home@hello", false);
