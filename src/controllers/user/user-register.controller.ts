import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";
import bcrypt from "bcryptjs";

export class UserRegisterController {
    async store(req: Request, res: Response) {
        const { email, username, password } = req.body;
        
        // verifica se o usuário já existe pelo nome de usuário
        const userByUsername = await prisma.user.findUnique({ where: { username } });
        if (userByUsername) {
            return res.status(400).json({ error: "Nome de usuário já está em uso!" });
        }

        // verifica se o usuário já existe pelo email
        const userByEmail = await prisma.user.findUnique({ where: { email } });
        if (userByEmail) {
            return res.status(400).json({ error: "E-mail já está em uso!" });
        }

        const hash_password = await bcrypt.hash(password, 8);
        const user = await prisma.user.create({
            data: {
                email, 
                username,
                password: hash_password,
            },
        });



        return res.status(201).json({ user });
    }
}
