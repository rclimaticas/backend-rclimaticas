import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export class MaterialCreateController {
    async store(req: Request, res: Response) {
        const { name, email, publicationType, subjectType, fileUrl } = req.body;
        const fileUpload = req.file; // `req.file` será populado pelo `multer`

        if (!fileUpload) {
            return res.status(400).json({ error: "Arquivo não enviado." });
        }

        try {
            const newMaterial = await prisma.material.create({
                data: {
                    name,
                    email,
                    publicationType,
                    subjectType,
                    fileUrl,
                    fileUpload: fileUpload.path, // Salva o caminho do arquivo
                    date: new Date() // Define a data atual
                },
            });
            res.status(201).json(newMaterial);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao criar o material." });
        }
    }
}
