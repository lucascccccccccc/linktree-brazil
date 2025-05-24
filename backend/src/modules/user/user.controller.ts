import { AuthService } from "../auth/auth.service";
import { UserService } from "./user.service";
import { Context } from "elysia";

export const getAllUsersHandler = async (ctx: Context) => {
  const { set } = ctx;

  try {
    AuthService.verifyToken(ctx);

    const users = await UserService.getAllUsers();
    return users.map(({ password, ...user }) => user);
  } catch (error: any) {
    set.status = error.status || 500;
    return { error: error.message || 'Internal server error' };
  }
};

export const getUserByIdHandler = async (ctx: Context) => {
  const { set } = ctx;
  const { userId } = ctx.params;

  try {
    const decodedUser = AuthService.verifyToken(ctx);
    const user = await UserService.getUserById(userId);

    if (decodedUser.userId !== userId) {
      set.status = 403;
      return { error: "You are not authorized to access this user" };
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;

  } catch (error: any) {
    if (error.message === "User not found") {
      set.status = 404;
      return { error: "User not found" };
    }

    set.status = error.status || 400;
    return { error: error.message || 'Bad request' };
  }
};

export const getUserByUsernameHandler = async (ctx: Context) => {
  const { set } = ctx;
  const { username } = ctx.params;

  try {
    const user = await UserService.getUserByUsername(username);

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error: any) {
    if (error.message === "User not found") {
      set.status = 404;
      return { error: "User not found" };
    }

    set.status = error.status || 500;
    return { error: error.message || 'Internal server error' };
  }
};
