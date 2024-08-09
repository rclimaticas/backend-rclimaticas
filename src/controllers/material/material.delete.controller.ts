import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export class MaterialDeleteController {
    async delete(req: Request, res: Response) {
        const materialId = parseInt(req.params.materialId); 
        try {
            await prisma.material.delete({ where: { id: materialId } });
            res.json({ message: "Material excluído com sucesso." });
        } catch (error) {
            res.status(500).json({ error: "Erro ao excluir o material." });
        }
    }
}
