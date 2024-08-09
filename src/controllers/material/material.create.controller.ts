import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";
import * as nodemailer from 'nodemailer';

export class MaterialCreateController {
    async store(req: Request, res: Response) {
        const { name, email, publicationType, subjectType, fileUrl, description } = req.body;

        if (description.length > 280) {
            return res.status(400).json({ error: "A descrição não pode ter mais que 280 caracteres." });
        }

        try {
            const newMaterial = await prisma.material.create({
                data: {
                    name,
                    email,
                    publicationType,
                    subjectType,
                    fileUrl,
                    description,
                    date: new Date() 
                },
            });

            let transporter = nodemailer.createTransport({
                service: 'gmail', 
                auth: {
                    user: 'vitorsilva@aluno.ufrb.edu.br',
                    pass: process.env.PASSWORD_EMAIL,
                },
            });

            let mailOptions = {
                from: 'r.climaticas@gmail.com',
                to: 'rafael@gamba.org.br',
                subject: '📚 Novo Artigo Enviado para Análise.',
                text: `
                Um Artigo foi criado com os seguintes detalhes:
                Nome do usuário: ${name}
                Email do Usuário: ${email}
                Tipo de Publicação: ${publicationType}
                Descrição: ${description}
                Assunto: ${subjectType}
                Link do Artigo: ${fileUrl}
                Data: ${new Date().toISOString()}
                `,
            };

            await transporter.sendMail(mailOptions);
            res.status(201).json(newMaterial);
        } catch (error) {
            console.error("Erro ao criar o material:", error);
            res.status(500).json({ error: "Erro ao criar o material." });
        }
    }
}
