import { Context } from "elysia";
import { UserRegisterSchema, UserLoginSchema } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";

export const registerUserHandler = async ({ body, set }: Context) => {
    const parsed = UserRegisterSchema.safeParse(body)

    if (!parsed.success) {
        set.status = 400
        return { error: "Invalid input" };
    }

    console.log(body);
    try {
        const user = await UserService.createUser(parsed.data);
        const { password, ...userWithoutPassword } = user;

        return { message: "user created successful!", userWithoutPassword };
    } catch (error) {
        set.status = 500
        return error
    }
}

export const loginUserHandler = async ({ body, set }: Context) => {
    const parsed = UserLoginSchema.safeParse(body);

    if (!parsed.success) {
        return { error: "Invalid input" };
    }

    console.log(body);
    try {
        const { email, password } = parsed.data;
        const { token } = await AuthService.loginUser(email, password);

        return { /*message: "login successful", user,*/ token };
    } catch (error) {
        set.status = 401
        return error
    }
}