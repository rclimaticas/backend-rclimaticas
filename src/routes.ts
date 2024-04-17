import { Router } from 'express'
import { UserRegisterController } from './controllers/user/user-register.controller';
import { UserLoginController } from './controllers/user/user-login.controller';
import { AuthMiddleware } from './middlewares/auth';

import { MaterialCreateController } from './controllers/material/material.create.controller';
import { MaterialGetController } from './controllers/material/material.get.contoller';
import { MaterialUpdateController } from './controllers/material/material.update.controler';
import { MaterialDeleteController } from './controllers/material/material.delete.controller';



// user const's
const registerController = new UserRegisterController();
const loginController = new UserLoginController();

// payment const's
const materialController = new MaterialCreateController();
const materialGetController = new MaterialGetController();
const materialUpdateController = new MaterialUpdateController();
const materialDeleteController = new MaterialDeleteController();



export const router = Router();

// user routes
router.post("/register", registerController.store);
router.post("/login", loginController.authenticate)

// materials routes
router.post("/materials/material", AuthMiddleware, materialController.store);
router.get("/materials", AuthMiddleware, materialGetController.index);
router.put("/materials/:materialId", AuthMiddleware, materialUpdateController.update);
router.delete("/materials/:materialId", AuthMiddleware, materialDeleteController.delete);
