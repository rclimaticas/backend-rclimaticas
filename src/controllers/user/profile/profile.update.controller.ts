import { Request, Response } from "express";
import { prisma } from "../../../utils/prisma";

export class ProfileUpdateController {
    async update(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        const {
            email,
            username,
            password,
            whatsapp,
            gender,
            instagram,
            twitter,
            linkedin,
            facebook,
            areaOfInterest,
            contributionAxis,
            weeklyAvailability,
            themesBiomes,
            themesCommunities,
            imageBase64
        } = req.body;
        try {

            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data: {
                    email,
                    username,
                    password,
                    whatsapp,
                    gender,
                    instagram,
                    twitter,
                    linkedin,
                    facebook,
                    imageBase64,
                    areaOfInterest,
                    contributionAxis,
                    weeklyAvailability,
                    themesBiomes,
                    themesCommunities,
                },
                
            });

            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar so dados do usuário." });
        }
    }
}
