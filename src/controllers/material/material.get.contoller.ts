import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export class MaterialGetController {
    async index(req: Request, res: Response) {
        try {
            const { media, topic, source, date} = req.query;
            const materials = await prisma.material.findMany({
                where: {
                    // condições de filtro com base nos parâmetros de consulta
                    media: media ? { contains: media.toString() } : undefined,
                    topic: topic ? { contains: topic.toString() } : undefined,
                    source: source ? { contains: source.toString() } : undefined,
                    date: date ? new Date(date.toString()) : undefined,
                }
            });
            res.json(materials);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar materiais." });
        }
    }

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
