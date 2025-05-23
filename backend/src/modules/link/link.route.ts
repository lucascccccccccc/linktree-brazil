import Elysia from "elysia";
import { createLinkHandler, getLinksByUserIdHandler } from "./link.controller";

export const newLinkRoute = new Elysia()
    .post("/", createLinkHandler)

export const getUsersLinkRoute = new Elysia()
    .get("/:userId/links", getLinksByUserIdHandler)