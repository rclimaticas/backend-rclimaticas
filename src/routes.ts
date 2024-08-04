import { Router } from 'express';
import { UserRegisterController } from './controllers/user/user-register.controller';
import { UserLoginController } from './controllers/user/user-login.controller';
import { AuthMiddleware } from './middlewares/auth';
import multer from 'multer';
import { prisma } from './utils/prisma';
import fs from 'fs';
import path from 'path';

import { MaterialCreateController } from './controllers/material/material.create.controller';
import { MaterialGetController } from './controllers/material/material.get.controller';
import { MaterialUpdateController } from './controllers/material/material.update.controler';
import { MaterialDeleteController } from './controllers/material/material.delete.controller';

import { ProfileUpdateController } from './controllers/user/profile/profile.update.controller';
import { ProfileGetController } from './controllers/user/profile/profile.get.controller';
import { ProfileDeleteController } from './controllers/user/profile/profile.delete.controller';

import { ImpactsCreateController } from './controllers/impactos/impacts.create.controller';

// multer const
const upload = multer();

// user const's
const registerController = new UserRegisterController();
const loginController = new UserLoginController();

// material const's
const materialController = new MaterialCreateController();
const materialGetController = new MaterialGetController();
const materialUpdateController = new MaterialUpdateController();
const materialDeleteController = new MaterialDeleteController();

// profile const's
const profileUpdateController = new ProfileUpdateController();
const profileGetController = new ProfileGetController();
const profileDeleteController = new ProfileDeleteController();

//impacts const's
const impactsCreateController = new ImpactsCreateController();

export const router = Router();

// user routes
router.post("/register", registerController.store);
router.post("/login", loginController.authenticate);

// Helper to get current directory in CommonJS
const __dirname = path.resolve();

// materials routes
router.post('/upload/:materialId', upload.single('fileUpload'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo enviado');
    }

    const { originalname, buffer } = req.file;
    const { materialId } = req.params;

    try {
        const material = await prisma.material.findUnique({
            where: { id: parseInt(materialId, 10) },
        });

        if (!material) {
            return res.status(404).send('Material não encontrado');
        }

        const uploadPath = path.join(__dirname, 'uploads', originalname);
        fs.writeFileSync(uploadPath, buffer);
        const file = await prisma.fileUpload.create({
            data: {
                path: uploadPath,
                date: new Date(),
                materialId: parseInt(materialId, 10),
            },
        });
        res.status(201).json(file);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao salvar o arquivo');
    }
});

router.post("/materials/material", materialController.store);
router.put("/materials/:materialId", AuthMiddleware, materialUpdateController.update);
router.delete("/materials/:materialId", AuthMiddleware, materialDeleteController.delete);

router.get("/materials", materialGetController.list)


// profile routes
router.put("/profile/:id", AuthMiddleware, profileUpdateController.update);
router.get("/profile/:id", AuthMiddleware, profileGetController.show);
router.get("/profile", AuthMiddleware, profileGetController.index);
router.delete("/profile/:id", AuthMiddleware, profileDeleteController.delete);
router.post("/profile/:id", AuthMiddleware, profileUpdateController.update);

// impacts routes
router.post("/impacts", AuthMiddleware, impactsCreateController.store)
