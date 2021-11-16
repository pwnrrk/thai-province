"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
exports.Routes = [];
function applyFuntion(routePath, method, functionPath, authenticate) {
    var splitted = functionPath.split("@");
    var classPath = splitted[0];
    var functionName = splitted[1];
    var route = {
        method: method,
        routePath: routePath,
        classPath: classPath,
        functionName: functionName,
        authenticate: authenticate
    };
    exports.Routes.push(route);
}
var Router = /** @class */ (function () {
    function Router() {
    }
    Router.get = function (path, functionPath, authenticate) {
        applyFuntion(path, "get", functionPath, authenticate);
    };
    Router.post = function (path, functionPath, authenticate) {
        applyFuntion(path, "post", functionPath, authenticate);
    };
    Router.put = function (path, functionPath, authenticate) {
        applyFuntion(path, "put", functionPath, authenticate);
    };
    Router.delete = function (path, functionPath, authenticate) {
        applyFuntion(path, "delete", functionPath, authenticate);
    };
    return Router;
}());
exports.default = Router;
