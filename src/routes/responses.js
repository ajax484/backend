import express from "express";
import { flwResponse } from "../controllers/responses.js";

const responsesRoutes = express.Router();

responsesRoutes.get("/flw", flwResponse);

export default responsesRoutes;
