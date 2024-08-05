"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialGetController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class MaterialGetController {
    async list(req, res) {
        try {
            const materials = await prisma.material.findMany({
                include: {
                    FileUpload: true,
                },
            });
            res.json(materials);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao buscar os materiais." });
        }
    }
}
exports.MaterialGetController = MaterialGetController;
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
