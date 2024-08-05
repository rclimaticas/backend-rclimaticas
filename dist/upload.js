"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/upload.ts
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const prisma_1 = require("./utils/prisma");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo enviado');
    }
    const { originalname, mimetype, buffer } = req.file;
    try {
        const file = await prisma_1.prisma.fileUpload.create({
            data: {
                path: originalname,
                date: new Date(),
                materialId: 1, // Ajuste este valor conforme necessário para relacionar com um material existente
            },
        });
        res.status(201).json(file);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Erro ao salvar o arquivo');
    }
});
exports.default = router;
