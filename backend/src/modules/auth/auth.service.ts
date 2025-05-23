import { UserRepository } from "../user/user.repository";
import jwt, { JwtPayload, verify } from "jsonwebtoken";
import { Context } from "elysia";

export const AuthService = {

    loginUser: async (email: string, password: string) => {
        const user = await UserRepository.getUserByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }

        const checkPass = await Bun.password.verify(password, user.password);
        if (!checkPass) {
            throw new Error("Invalid credentials");
        }

        const token = jwt.sign({
            userId: user.id,
            email: user.email,
            name: user.name,
            photo: user.photo,
            description: user.description,
            username: user.username,
        }, process.env.JWT_SECRET || "cmakqgf8r0000u2xs36et8jhe", {
            expiresIn: "1h",
        });

        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    },

    verifyToken: (ctx: Context) => {
        const authHeader = ctx.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new Error("Token não fornecido");
        }
        const token = authHeader.split(" ")[1];

        try {
            // const decoded = verify(token, process.env.JWT_SECRET || "cmakqgf8r0000u2xs36et8jhe") as JwtPayload;
            // return decoded

            return verify(token, process.env.JWT_SECRET || "cmakqgf8r0000u2xs36et8jhe") as JwtPayload
        } catch (error) {
            throw new Error("Invalid token");
        }
    }

};
