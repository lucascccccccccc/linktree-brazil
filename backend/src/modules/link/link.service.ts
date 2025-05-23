import { LinkRepository } from "./link.repository";
import { LinkInput } from "./link.types";

export const LinkService = {
    createLink: async (link: LinkInput) => {
        return await LinkRepository.createLink(link);
    },

    getLinksByUserId: async (userId: string) => {
        const links = await LinkRepository.getLinkByUserId(userId);
        const userExists = await LinkRepository.getUserById(userId);
        if (!userExists) {
            throw new Error("User not found");
        }


        if (!links || links.length === 0) {
            throw new Error("Links not found");
        }

        return links;
    },

}