"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImpactsCreateController = void 0;
const prisma_1 = require("../../utils/prisma");
const nodemailer = __importStar(require("nodemailer"));
class ImpactsCreateController {
    async store(req, res) {
        const { subject, urgency, locality, support, affectedCommunity, biomes, situation, contribution, userId } = req.body;
        try {
            const newImpact = await prisma_1.prisma.impacts.create({
                data: {
                    subject,
                    urgency,
                    locality,
                    support,
                    affectedCommunity,
                    biomes,
                    situation,
                    contribution,
                    date: new Date(),
                    userId
                },
            });
            const user = await prisma_1.prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'vitorsilva@aluno.ufrb.edu.br',
                    pass: process.env.PASSWORD_EMAIL,
                },
            });
            let mailOptions = {
                from: 'r.climaticas@gmail.com',
                to: 'jvittor.contatos@gmail.com',
                subject: 'Novo Impacto Criado',
                text: `
                    Um novo impacto foi criado com os seguintes detalhes:
                    Assunto: ${subject}
                    Urgência: ${urgency}
                    Localidade: ${locality}
                    Suporte: ${support}
                    Comunidade Afetada: ${affectedCommunity}
                    Biomas: ${biomes}
                    Situação: ${situation}
                    Contribuição: ${contribution}
                    ID do Usuário: ${userId}
                    Nome do Usuário: ${user.username}
                    E-mail do Usuário: ${user.email}
                    Data: ${new Date().toISOString()}
                `,
            };
            // enviando o email
            await transporter.sendMail(mailOptions);
            res.status(201).json(newImpact);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao criar o impacto." });
        }
    }
}
exports.ImpactsCreateController = ImpactsCreateController;
