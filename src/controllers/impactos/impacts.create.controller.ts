import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";
import * as nodemailer from 'nodemailer';

export class ImpactsCreateController {
    async store(req: Request, res: Response) {
        const { subject, urgency, locality, support, affectedCommunity, biomes, situation, contribution, userId } = req.body;

        try {
            const newImpact = await prisma.impacts.create({
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
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            const transporter = nodemailer.createTransport({
                host: 'mail.privateemail.com',
                port: 465, // ou 587 para TLS
                secure: true, // true para 465, false para outras portas
                auth: {
                    user: 'vitor@ligacolaborativa.site',
                    pass: process.env.PASSWORD_EMAIL,
                },
            });
            let mailOptions = {
                from: 'vitor@ligacolaborativa.site',
                to: 'rafael@gamba.org.br',
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
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao criar o impacto." });
        }
    }
}
