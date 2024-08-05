"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileGetController = void 0;
const prisma_1 = require("../../../utils/prisma");
class ProfileGetController {
    async index(req, res) {
        try {
            const users = await prisma_1.prisma.user.findMany();
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao buscar os usuários." });
        }
    }
    async show(req, res) {
        const userId = parseInt(req.params.id);
        try {
            const user = await prisma_1.prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao buscar o usuário." });
        }
    }
}
exports.ProfileGetController = ProfileGetController;
