import { prisma } from '../../database/database';
import { LinkInput } from './link.types';

export const LinkRepository = {
    createLink: (data: LinkInput) => prisma.link.create({ data }),
    getLinkByUserId: (userId: string) => prisma.link.findMany({ where: { userId } }),
    getUserById: (userId: string) => prisma.user.findUnique({ where: { id: userId } }),
}