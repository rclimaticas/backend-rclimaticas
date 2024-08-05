"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileDeleteController = void 0;
const prisma_1 = require("../../../utils/prisma");
class ProfileDeleteController {
    async delete(req, res) {
        const userId = parseInt(req.params.id);
        try {
            await prisma_1.prisma.user.delete({ where: { id: userId } });
            res.json({ message: "Usuário excluído com sucesso." });
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao excluir o usuário." });
        }
    }
}
exports.ProfileDeleteController = ProfileDeleteController;
