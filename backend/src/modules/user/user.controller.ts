import { AuthService } from "../auth/auth.service";
import { UserService } from "./user.service";
import { Context } from "elysia";
import { UserUpdateInput } from "./user.types";

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

    const { password, email, createdAt, id, ...userWithoutPassword } = user;

    const links = user.links.map((link) => {
      const { userId, createdAt, updatedAt, ...linkWithoutUserId } = link;
      return linkWithoutUserId;
    });

    return { ...userWithoutPassword, links };
  } catch (error: any) {
    if (error.message === "User not found") {
      set.status = 404;
      return { error: "User not found" };
    }

    set.status = error.status || 500;
    return { error: error.message || 'Internal server error' };
  }
};

export const deleteUserHandler = async (ctx: Context) => {
  const { set } = ctx;
  const { userId } = ctx.params;

  try {
    const decodedUser = AuthService.verifyToken(ctx);

    if (decodedUser.userId !== userId) {
      set.status = 403;
      return { error: "You are not authorized to delete this user" };
    }

    await UserService.deleteUser(userId);
    return { message: "User deleted successfully" };

  } catch (error: any) {
    if (error.message === "User not found") {
      set.status = 404;
      return { error: "User not found" };
    }

    set.status = error.status || 500;
    return { error: error.message || 'Internal server error' };
  }
}

export const updateUserHandler = async (ctx: Context) => {
  const { set } = ctx;
  const { userId } = ctx.params;
  const { username, name, photo, description } = ctx.body as UserUpdateInput;

  try {
    const decodedUser = AuthService.verifyToken(ctx);
    if (decodedUser.userId !== userId) {
      set.status = 403;
      return { error: "You are not authorized to update this user" };
    }

    const updatedUser = await UserService.updateUser(userId, {
      username,
      name,
      photo,
      description,
    });

    return { message: "User updated successfully", user: updatedUser };
  } catch (error: any) {
    if (error.message === "User not found") {
      set.status = 404;
      return { error: "User not found" };
    }

    set.status = error.status || 500;
    return { error: error.message };
  }
};