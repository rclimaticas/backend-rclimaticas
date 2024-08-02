import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export class MaterialGetController {
    async list(req: Request, res: Response): Promise<void> {
        try {
            const materials = await prisma.material.findMany({
                include: {
                    FileUpload: true,
                },
            });
            res.json(materials);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar os materiais." });
        }
    }
}

// vai servir mais tarde para apagar os testes no backend de envio de materials e deixar bonitinho :)
// export class MaterialsController {
//     async list(req: Request, res: Response): Promise<void> {
//         try {
//             const materials = await prisma.material.findMany({
//                 include: {
//                     FileUpload: true,
//                 },
//             });
//             res.json(materials);
//         } catch (error) {
//             res.status(500).json({ error: "Erro ao buscar os materiais." });
//         }
//     }

//     async deleteAll(req: Request, res: Response): Promise<void> {
//         try {
//             await prisma.material.deleteMany({});
//             res.status(200).json({ message: "Todos os materiais foram apagados com sucesso." });
//         } catch (error) {
//             res.status(500).json({ error: "Erro ao apagar os materiais." });
//         }
//     }
// }

