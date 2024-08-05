"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialCreateController = void 0;
const prisma_1 = require("../../utils/prisma");
class MaterialCreateController {
    async store(req, res) {
        const { name, email, publicationType, subjectType, fileUrl } = req.body;
        try {
            const newMaterial = await prisma_1.prisma.material.create({
                data: {
                    name,
                    email,
                    publicationType,
                    subjectType,
                    fileUrl,
                    date: new Date()
                },
            });
            res.status(201).json(newMaterial);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao criar o material." });
        }
    }
}
exports.MaterialCreateController = MaterialCreateController;
