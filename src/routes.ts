import { Router } from 'express'
import { UserRegisterController } from './controllers/user/user-register.controller';
import { UserLoginController } from './controllers/user/user-login.controller';
import { AuthMiddleware } from './middlewares/auth';

import { MaterialCreateController } from './controllers/material/material.create.controller';
import { MaterialGetController } from './controllers/material/material.get.contoller';
import { MaterialUpdateController } from './controllers/material/material.update.controler';
import { MaterialDeleteController } from './controllers/material/material.delete.controller';


import { ProfileUpdateController } from './controllers/user/profile/profile.update.controller';
import { ProfileGetController } from './controllers/user/profile/profile.get.controller';
import { ProfileDeleteController } from './controllers/user/profile/profile.delete.controller';

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



export const router = Router();

// user routes
router.post("/register", registerController.store);
router.post("/login", loginController.authenticate)

// materials routes
router.post("/materials/material", AuthMiddleware, materialController.store);
router.get("/materials", AuthMiddleware, materialGetController.index);
router.put("/materials/:materialId", AuthMiddleware, materialUpdateController.update);
router.delete("/materials/:materialId", AuthMiddleware, materialDeleteController.delete);

// profile routes
router.put("/profile/:id", AuthMiddleware, profileUpdateController.update)
router.get("/profile/:id", AuthMiddleware, profileGetController.show)
router.get("/profile", AuthMiddleware, profileGetController.index)
router.delete("/profile/:id", AuthMiddleware, profileDeleteController.delete)
router.post("/profile/:id", AuthMiddleware, profileUpdateController.update)