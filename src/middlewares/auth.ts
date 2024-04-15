import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


type TokenPayload = {
    id: string;
    iat: number;
    exp: number;
};

export function AuthMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { authorization } = req.headers; 

    if (!authorization) {
        return res.status(401).json({ error: "token nao fornecido" });
    }

    const [, token]= authorization.split(" ");

    try {
        const decoded = jwt.verify(token, "my_secret");
        const { id } = decoded as TokenPayload;

        req.userId = id;
        next();
    } catch (error) {
        return res.status(401).json({ error: "token invalido" });
    }
}