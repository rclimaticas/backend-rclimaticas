import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";
import * as nodemailer from 'nodemailer';

export class NewsletterCreateController {
    async store(req: Request, res: Response) {
        const { name, email } = req.body;

        try {
            const newNewsletter= await prisma.newsletter.create({
                data: {
                    name,
                    email,
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
                subject: 'Novo Email cadastrado na Newsletter',
                text: `
                    Um novo email foi cadastrado na Newsletter:
                    Email: ${email},
                    Nome: ${name}
                    Data: ${new Date().toISOString()}
                `,
            };

            // enviando o email
            await transporter.sendMail(mailOptions);
            res.status(201).json(newNewsletter);
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar o material." });
        }
    }
}


