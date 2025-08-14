import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/jwt.config";

const prisma = new PrismaClient();

export async function signUp(email: string, password: string, name?: string) {
    // چک ایمیل تکراری
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    // هش پسورد
    const hashedPassword = await bcrypt.hash(password, 10);

    // ذخیره کاربر
    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });

    const token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
    );

    return { user: newUser, token };
}


export async function login(email: string, password: string) {
    // پیدا کردن کاربر با ایمیل
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error("Invalid email or password");
    }

    // چک کردن صحت پسورد
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    // ساخت JWT
    const token = jwt.sign(
        { userId: user.id, email: user.email },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
    );

    return { user, token };
}
