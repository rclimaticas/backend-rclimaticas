import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export class ImpactsListController {
    async index(req: Request, res: Response) {
        const { userId } = req.params;
        const numericUserId = Number(userId);

        if (isNaN(numericUserId)) {
            return res.status(400).json({ error: "ID do usuário inválido." });
        }

        try {
            const impacts = await prisma.impacts.findMany({
                where: { userId: numericUserId },
                orderBy: { date: 'desc' },
            });

            if (impacts.length === 0) {
                return res.status(404).json({ message: "Nenhum impacto encontrado para este usuário." });
            }

            res.status(200).json(impacts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao listar os impactos." });
        }
    }
}
