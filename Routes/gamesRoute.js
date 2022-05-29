import { getGames } from "../Controllers/gamesController.js";
import { gameValidation } from "../Middlewares/gamesValidation.js";
import { Router } from "express";

const gameController = Router();
gameController.get("/games", getGames);
gameController.post("/games", gameValidation);

export default gameController;