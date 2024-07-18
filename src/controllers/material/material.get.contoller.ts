import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export class MaterialGetController {
    async show(req: Request, res: Response) {
        const materialId = parseInt(req.params.id);
        try {
            const material = await prisma.material.findUnique({
                where: { id: materialId },
            });
            if (!material) {
                return res.status(404).json({ error: "Material não encontrado." });
            }
            res.json(material);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar o material." });
        }
    }
}
