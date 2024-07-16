import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export class MaterialUpdateController {
    async update(req: Request, res: Response) {
        const materialId = parseInt(req.params.id);
        const { media, topic, source, link, fileUrl, date } = req.body;
        try {
            const updatedMaterial = await prisma.material.update({
                where: { id: materialId },
                data: {
                    media, 
                    topic,
                    source,
                    link,
                    fileUrl,
                    date,
                },
            });
            res.json(updatedMaterial);
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar o material." });
        }
    }
}
