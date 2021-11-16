"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var process_1 = __importDefault(require("process"));
var config = process_1.default.env;
function verifiyToken(request, response, next) {
    var token = request.body.token
        || request.query.token
        || (request.headers.authorization && request.headers.authorization.split(" ")[1]);
    var prefix = request.headers.authorization ? request.headers.authorization.split(" ")[0] : "";
    if (!token || prefix != "Bearer:") {
        return response.status(403);
    }
    try {
        if (!config.TOKEN_KEY)
            return response.status(500);
        var decoded = jsonwebtoken_1.default.verify(token, config.TOKEN_KEY, {});
        request.body.user = decoded;
    }
    catch (error) {
        return response.status(401);
    }
    return next();
}
exports.default = verifiyToken;
