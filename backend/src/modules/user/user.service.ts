import { UserRepository } from "./user.repository";
import { UserInput, UserUpdateInput } from "./user.types";
import jwt from "jsonwebtoken";


export const UserService = {

    getAllUsers: async () => {
        return UserRepository.getAllUsers();
    },

    createUser: async (user: UserInput) => {
        const existingUser = await UserRepository.getUserByEmail(user.email);

        if (existingUser) {
            throw new Error("User already exists");
        }

        return UserRepository.createUser(user);
    },

    getUserById: async (userId: string) => {
        const user = await UserRepository.getUserById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        return user;
    },

    getUserByEmail: async (email: string) => {
        const user = await UserRepository.getUserByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }

        return user;
    },

    getUserByUsername: async (username: string) => {
        const user = await UserRepository.getUserByUsername(username);
        if (!user) {
            throw new Error("User not found");
        }

        return user;
    },

    deleteUser: async (userId: string) => {
        const user = await UserRepository.getUserById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        return UserRepository.deleteUser(userId);
    },


    /*
    updateUser: async (userId: string, data: UserUpdateInput) => {
        const user = await UserRepository.getUserById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        return UserRepository.updateUser(userId, data);
    }
        */

    updateUser: async (userId: string, data: UserUpdateInput) => {
        const user = await UserRepository.getUserById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const updatedUser = await UserRepository.updateUser(userId, data);
        const token = jwt.sign({
            userId: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            photo: updatedUser.photo,
            description: updatedUser.description,
            username: updatedUser.username,
        }, process.env.JWT_SECRET || "cmakqgf8r0000u2xs36et8jhe", {
            expiresIn: "1h",
        });

        const { password, ...userWithoutPassword } = updatedUser;
        return { user: userWithoutPassword, token };
    }
}