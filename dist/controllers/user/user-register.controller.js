"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisterController = void 0;
const prisma_1 = require("../../utils/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserRegisterController {
    async store(req, res) {
        const { email, username, password } = req.body;
        // verifica se o usuário já existe pelo nome de usuário
        const userByUsername = await prisma_1.prisma.user.findUnique({ where: { username } });
        if (userByUsername) {
            return res.status(400).json({ error: "Nome de usuário já está em uso!" });
        }
        // verifica se o usuário já existe pelo email
        const userByEmail = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (userByEmail) {
            return res.status(400).json({ error: "E-mail já está em uso!" });
        }
        const hash_password = await bcryptjs_1.default.hash(password, 8);
        const user = await prisma_1.prisma.user.create({
            data: {
                email,
                username,
                password: hash_password,
            },
        });
        return res.status(201).json({ user });
    }
}
exports.UserRegisterController = UserRegisterController;
