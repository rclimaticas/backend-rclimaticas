import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";
import bcrypt from "bcryptjs";

export class UserRegisterController {
    async store(req: Request, res: Response) {
        const { email, username, password } = req.body;
        
        const userExists = await prisma.user.findUnique({ where: { email } });
        if (userExists) {
            return res.json({ error: "Usuário já existe!" });
        }

        const hash_password = await bcrypt.hash(password, 8);
        const user = await prisma.user.create({
            data: {
                email, 
                username,
                password: hash_password,
            },
        });

        return res.json({ user });
    }
}
