import { Request, Response } from 'express';
import { prisma } from '../../../utils/prisma';
import nodemailer from 'nodemailer';
import ExcelJS from 'exceljs';
import { Buffer } from 'buffer';

export class ProfileGetController {
    async index(req: Request, res: Response) {
        try {
            const startDate = new Date('2024-09-02T00:00:00Z'); // Data de início
            const endDate = new Date('2024-09-09T23:59:59Z'); // Data de fim

            const users = await prisma.user.findMany({
                where: {
                    createdAt: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
            });

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Users');

            worksheet.columns = [
                { header: 'ID', key: 'id', width: 10 },
                { header: 'Nome', key: 'name', width: 30 },
                { header: 'Email', key: 'email', width: 30 },
                { header: 'Criado em', key: 'createdAt', width: 30 },
            ];

            users.forEach(user => {
                worksheet.addRow({
                    id: user.id,
                    name: user.username,
                    email: user.email,
                    createdAt: user.createdAt,
                });
            });

            const buffer = await workbook.xlsx.writeBuffer() as Buffer;
            const transporter = nodemailer.createTransport({
                host: 'mail.privateemail.com',
                port: 465, // ou 587 para TLS
                secure: true, // true para 465, false para outras portas
                auth: {
                    user: 'vitor@ligacolaborativa.site',
                    pass: process.env.PASSWORD_EMAIL,
                },
            });

            transporter.sendMail({
                from: 'vitor@ligacolaborativa.site',
                to: 'jvittor.contatos@gmail.com',
                subject: 'Lista de Usuários',
                text: 'Segue em anexo a lista de usuários.',
                attachments: [
                    {
                        filename: 'users.xlsx',
                        content: buffer,
                        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    }
                ]
            }, (err, info) => {
                if (err) {
                    console.error('Erro ao enviar email:', err);
                } else {
                    console.log('Email enviado:', info.response);
                }
            });

            res.json(users);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar os usuários." });
        }
    }

    async show(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar o usuário." });
        }
    }
}
