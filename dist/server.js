"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const upload = (0, multer_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 } // Limite de 50MB para arquivos
});
app.use((0, cors_1.default)()); // Adicionando o middleware cors
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(routes_1.router);
app.listen(3333, () => console.log('Server is running'));
