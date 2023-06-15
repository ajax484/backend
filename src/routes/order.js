import express from "express";
import { getOrders } from "../controllers/order.js";

const orderRoutes = express.Router();

orderRoutes.get("/", getOrders);

export default orderRoutes;
