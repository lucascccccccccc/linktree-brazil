import Elysia from "elysia"
import { loginUserHandler, registerUserHandler } from "../auth/auth.controller"

export const authRoutes = new Elysia()
    .post("/register", registerUserHandler)
    .post("/login", loginUserHandler)
