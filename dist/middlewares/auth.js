"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function AuthMiddleware(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "token nao fornecido" });
    }
    const [, token] = authorization.split(" ");
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "my_secret");
        const { id } = decoded;
        req.userId = id;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "token invalido" });
    }
}
exports.AuthMiddleware = AuthMiddleware;
