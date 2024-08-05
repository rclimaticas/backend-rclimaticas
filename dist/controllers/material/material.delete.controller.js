"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialDeleteController = void 0;
const prisma_1 = require("../../utils/prisma");
class MaterialDeleteController {
    async delete(req, res) {
        const materialId = parseInt(req.params.id);
        try {
            await prisma_1.prisma.material.delete({ where: { id: materialId } });
            res.json({ message: "Material excluído com sucesso." });
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao excluir o material." });
        }
    }
}
exports.MaterialDeleteController = MaterialDeleteController;
