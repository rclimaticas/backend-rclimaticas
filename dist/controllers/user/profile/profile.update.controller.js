"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileUpdateController = void 0;
const prisma_1 = require("../../../utils/prisma");
class ProfileUpdateController {
    async update(req, res) {
        const userId = parseInt(req.params.id);
        const { email, username, password, whatsapp, gender, instagram, twitter, linkedin, facebook, areaOfInterest, contributionAxis, weeklyAvailability, themesBiomes, themesCommunities, imageBase64, roles, city, state, organization, peoples, } = req.body;
        try {
            const updatedUser = await prisma_1.prisma.user.update({
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
                    roles,
                    city,
                    state,
                    organization,
                    peoples,
                },
            });
            res.json(updatedUser);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao atualizar so dados do usuário." });
        }
    }
}
exports.ProfileUpdateController = ProfileUpdateController;
