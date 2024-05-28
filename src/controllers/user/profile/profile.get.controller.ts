// profile-get.controller.ts
import { Request, Response } from 'express';
import { prisma } from '../../../utils/prisma';

export class ProfileGetController {
    async index(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar os usuários." });
        }
    }

    async show(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar o usuário." });
        }
    }
}
