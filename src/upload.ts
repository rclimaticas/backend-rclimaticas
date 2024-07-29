// src/routes/upload.ts
import { Router } from 'express';
import multer from 'multer';
import { prisma } from './utils/prisma';

const router = Router();
const upload = multer();

router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo enviado');
  }

  const { originalname, mimetype, buffer } = req.file;

  try {
    const file = await prisma.fileUpload.create({
      data: {
        path: originalname,
        date: new Date(),
        materialId: 1, // Ajuste este valor conforme necessário para relacionar com um material existente
      },
    });
    res.status(201).json(file);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao salvar o arquivo');
  }
});

export default router;
