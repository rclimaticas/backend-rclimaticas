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
exports.NewsletterCreateController = void 0;
const prisma_1 = require("../../utils/prisma");
const nodemailer = __importStar(require("nodemailer"));
class NewsletterCreateController {
    async store(req, res) {
        const { name, email } = req.body;
        try {
            const newNewsletter = await prisma_1.prisma.newsletter.create({
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
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao criar o material." });
        }
    }
}
exports.NewsletterCreateController = NewsletterCreateController;
