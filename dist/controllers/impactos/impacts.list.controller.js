"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImpactsListController = void 0;
const prisma_1 = require("../../utils/prisma");
class ImpactsListController {
    async list(req, res) {
        const userId = parseInt(req.params.userId, 10);
        if (isNaN(userId)) {
            return res.status(400).json({ error: "ID do usuário inválido." });
        }
        try {
            const impacts = await prisma_1.prisma.impacts.findMany({
                where: { userId: userId },
                orderBy: { date: 'desc' }, //ordena pelo mais recente
            });
            if (!impacts.length) {
                return res.status(404).json({ message: "Nenhum impacto encontrado para este usuário." });
            }
            res.status(200).json(impacts);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao listar os impactos." });
        }
    }
}
exports.ImpactsListController = ImpactsListController;
