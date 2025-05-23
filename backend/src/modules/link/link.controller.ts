import { Context } from "elysia";
import { LinkInputSchema } from "./link.schema";
import { LinkService } from "./link.service";
import { AuthService } from "../auth/auth.service";
import { Prisma } from "@prisma/client";

export const createLinkHandler = async (ctx: Context) => {
    const { body, set } = ctx;

    const parsed = LinkInputSchema.safeParse(body);
    if (!parsed.success) {
        set.status = 400;
        return {
            error: 'Dados inválidos',
            issues: parsed.error.errors,
        };
    }

    try {
        const linkData = { ...parsed.data, userId: parsed.data.userId };
        return await LinkService.createLink(linkData);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            set.status = 400
            return { error: "User not found, link not created" }
        }
        set.status = 500;
        return { error: 'Erro ao criar link' }
    }
};

export const getLinksByUserIdHandler = async (ctx: Context) => {
    const { set } = ctx;

    try {
        const idFromParams = ctx.params.userId;
        const idFromJwt = AuthService.verifyToken(ctx);

        if (idFromParams !== idFromJwt.userId) {
            set.status = 403;
            return { error: 'You are not authorized to access this user' };
        }

        return await LinkService.getLinksByUserId(idFromJwt.userId);
    } catch (error) {
        set.status = 500;
        return { error: 'Erro ao buscar links: ' + error };
    }
}
