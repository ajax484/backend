import express from "express";
import { verifyDeposit } from "../controllers/webhooks.js";

const webhooksRoutes = express.Router();

webhooksRoutes.post("/flw", verifyDeposit);
webhooksRoutes.get("/flw", verifyDeposit);

export default webhooksRoutes;
