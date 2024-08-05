"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginController = void 0;
const prisma_1 = require("../../utils/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserLoginController {
    async authenticate(req, res) {
        const { email, password } = req.body;
        const user = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.json({ error: "usuario não encontrado ein!" });
        }
        const isValuePassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValuePassword) {
            return res.json({ error: "senha esta incorreta ein!" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, "my_secret", { expiresIn: "1d" });
        return res.json({ user, token });
    }
}
exports.UserLoginController = UserLoginController;
