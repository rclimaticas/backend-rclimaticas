"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_register_controller_1 = require("./controllers/user/user-register.controller");
const user_login_controller_1 = require("./controllers/user/user-login.controller");
const auth_1 = require("./middlewares/auth");
const multer_1 = __importDefault(require("multer"));
const prisma_1 = require("./utils/prisma");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const material_create_controller_1 = require("./controllers/material/material.create.controller");
const material_get_controller_1 = require("./controllers/material/material.get.controller");
const material_update_controler_1 = require("./controllers/material/material.update.controler");
const material_delete_controller_1 = require("./controllers/material/material.delete.controller");
const profile_update_controller_1 = require("./controllers/user/profile/profile.update.controller");
const profile_get_controller_1 = require("./controllers/user/profile/profile.get.controller");
const profile_delete_controller_1 = require("./controllers/user/profile/profile.delete.controller");
const impacts_create_controller_1 = require("./controllers/impactos/impacts.create.controller");
const impacts_list_controller_1 = require("./controllers/impactos/impacts.list.controller");
// multer const
const upload = (0, multer_1.default)();
// user const's
const registerController = new user_register_controller_1.UserRegisterController();
const loginController = new user_login_controller_1.UserLoginController();
// material const's
const materialController = new material_create_controller_1.MaterialCreateController();
const materialGetController = new material_get_controller_1.MaterialGetController();
const materialUpdateController = new material_update_controler_1.MaterialUpdateController();
const materialDeleteController = new material_delete_controller_1.MaterialDeleteController();
// profile const's
const profileUpdateController = new profile_update_controller_1.ProfileUpdateController();
const profileGetController = new profile_get_controller_1.ProfileGetController();
const profileDeleteController = new profile_delete_controller_1.ProfileDeleteController();
//impacts const's
const impactsCreateController = new impacts_create_controller_1.ImpactsCreateController();
const impactsListController = new impacts_list_controller_1.ImpactsListController();
exports.router = (0, express_1.Router)();
// user routes
exports.router.post("/register", registerController.store);
exports.router.post("/login", loginController.authenticate);
// Helper to get current directory in CommonJS
const __dirname = path_1.default.resolve();
// materials routes
exports.router.post('/upload/:materialId', upload.single('fileUpload'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo enviado');
    }
    const { originalname, buffer } = req.file;
    const { materialId } = req.params;
    try {
        const material = await prisma_1.prisma.material.findUnique({
            where: { id: parseInt(materialId, 10) },
        });
        if (!material) {
            return res.status(404).send('Material não encontrado');
        }
        const uploadPath = path_1.default.join(__dirname, 'uploads', originalname);
        fs_1.default.writeFileSync(uploadPath, buffer);
        const file = await prisma_1.prisma.fileUpload.create({
            data: {
                path: uploadPath,
                date: new Date(),
                materialId: parseInt(materialId, 10),
            },
        });
        res.status(201).json(file);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Erro ao salvar o arquivo');
    }
});
exports.router.post("/materials/material", materialController.store);
exports.router.put("/materials/:materialId", auth_1.AuthMiddleware, materialUpdateController.update);
exports.router.delete("/materials/:materialId", auth_1.AuthMiddleware, materialDeleteController.delete);
exports.router.get("/materials", materialGetController.list);
// profile routes
exports.router.put("/profile/:id", auth_1.AuthMiddleware, profileUpdateController.update);
exports.router.get("/profile/:id", auth_1.AuthMiddleware, profileGetController.show);
exports.router.get("/profile", auth_1.AuthMiddleware, profileGetController.index);
exports.router.delete("/profile/:id", auth_1.AuthMiddleware, profileDeleteController.delete);
exports.router.post("/profile/:id", auth_1.AuthMiddleware, profileUpdateController.update);
// impacts routes
exports.router.post("/impacts", auth_1.AuthMiddleware, impactsCreateController.store);
exports.router.get("/impacts/user/:userId'", auth_1.AuthMiddleware, impactsListController.list);
