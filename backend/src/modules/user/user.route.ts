import Elysia from "elysia"
import { deleteUserHandler, getAllUsersHandler, getUserByIdHandler, getUserByUsernameHandler } from "./user.controller"

export const userRoutes = new Elysia()
    .get("/", getAllUsersHandler)
    .get("/:userId", getUserByIdHandler)
    .get("/username/:username", getUserByUsernameHandler)
    .delete("/:userId", deleteUserHandler)
