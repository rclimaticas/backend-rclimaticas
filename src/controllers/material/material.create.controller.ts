import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";

export class MaterialCreateController {
    async store(req: Request, res: Response) {
        const { name, email, publicationType, subjectType, fileUrl } = req.body;

        try {
            const newMaterial = await prisma.material.create({
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
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar o material." });
        }
    }
}


