import express from "express";
import orderRoutes from "./order.js";
import { verifyUser } from "../middlewares/auth.js";
import depositRoutes from "./deposit.js";
import responsesRoutes from "./responses.js";
import webhooksRoutes from "./webhooks.js";

const router = express.Router();

const routes = [
  {
    path: "/order",
    route: orderRoutes,
    middleware: [verifyUser],
  },
  {
    path: "/deposit",
    route: depositRoutes,
    middleware: [verifyUser],
  },
  {
    path: "/responses",
    route: responsesRoutes,
    middleware: [],
  },
  {
    path: "/webhooks",
    route: webhooksRoutes,
    middleware: [],
  },
];

routes.forEach((route) => {
  router.use(route.path, route.middleware, route.route);
});

export default router;
