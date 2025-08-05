import { Request, Response } from "express";
import * as authService from "../services/authService";
import { InvalidInputError, DuplicatedEmailError } from "../errors/CustomErrors";

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await authService.registerUser(email, password);
        return res.status(201).json({ message: "User registered successfully", user });
    } catch (error: any) {
        if (error instanceof InvalidInputError) {
            return res.status(400).json({ error: "Invalid input" });
        }
        if (error instanceof DuplicatedEmailError) {
            return res.status(409).json({ error: "Email already exists" });
        }
        console.error("Registration error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}