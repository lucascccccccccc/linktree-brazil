import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { getUsersLinkRoute, newLinkRoute } from "./modules/link/link.route";
import { userRoutes } from "./modules/user/user.route";
import { logger } from "@tqman/nice-logger";
import { authRoutes } from "./modules/auth/auth.route";

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};

const app = new Elysia()
  .use(
    logger({
      mode: "live",
      withTimestamp: true,
    }),
  )

  .use(swagger())
  .use(cors(corsOptions))
  .group("/api/users", (app) => app.use(getUsersLinkRoute))
  .group("/api/auth", (app) => app.use(authRoutes))
  .group("/api/users", (app) => app.use(userRoutes))
  .group("/api/links", (app) => app.use(newLinkRoute));

app.listen(3001, () => {
  console.log(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}\n📖 Swagger available at http://${app.server?.hostname}:${app.server?.port}/swagger`,
  );
});
