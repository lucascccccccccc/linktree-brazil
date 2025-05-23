import { UserRepository } from "./user.repository";
import { UserInput } from "./user.types";

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
    }
}