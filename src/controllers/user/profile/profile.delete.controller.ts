import { Request, Response } from "express";
import { prisma } from "../../../utils/prisma";

export class ProfileDeleteController {
    async delete(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        try {
            await prisma.user.delete({ where: { id: userId } });
            res.json({ message: "Usuário excluído com sucesso." });
        } catch (error) {
            res.status(500).json({ error: "Erro ao excluir o usuário." });
        }
    }
}
