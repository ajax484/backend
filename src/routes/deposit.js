import express from "express";
import { makeDeposit } from "../controllers/deposit.js";

const depositRoutes = express.Router();

depositRoutes.post("/make", makeDeposit);

export default depositRoutes;
