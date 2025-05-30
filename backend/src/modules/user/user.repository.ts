import { prisma } from '../../database/database';
import { UserInput, UserUpdateInput } from './user.types';

export const UserRepository = {

    getAllUsers() {
        return prisma.user.findMany();
    },

    async createUser(data: UserInput) {
        const hashedPassword = await Bun.password.hash(data.password, {
            algorithm: 'bcrypt',
            cost: 10,
        });

        return prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
            }
        });
    },

    getUserById(userId: string) {
        return prisma.user.findUnique({ where: { id: userId } });
    },

    getUserByEmail(email: string) {
        return prisma.user.findUnique(
            {
                where: {
                    email
                }
            });
    },

    getUserByUsername(username: string) {
        return prisma.user.findUnique(
            {
                where:
                {
                    username
                },
                include: {
                    links: true
                }
            });
    },

    async deleteUser(userId: string) {
        await prisma.link.deleteMany({
            where: { userId }
        });

        return prisma.user.delete({
            where: { id: userId }
        });
    },

    async updateUser(userId: string, data: UserUpdateInput) {
        return prisma.user.update({
            where: { id: userId },
            data,
        });
    }
}