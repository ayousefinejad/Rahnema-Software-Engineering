import { Request, Response } from "express";
import { signUp } from "./auth.service";

export async function signUpController(req: Request, res: Response) {
    try {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const result = await signUp(email, password, name);
        res.status(201).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export async function loginController(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const token = await login(email, password);
        res.status(200).json({ token });
    } catch (err: any) {
        res.status(401).json({ error: err.message });
    }
}