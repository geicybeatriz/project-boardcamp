import { addGame, getGames } from "../Controllers/gamesController.js";
import { gameValidation } from "../Middlewares/gamesValidation.js";
import { checkGameExistence } from "../Middlewares/checkGame.js";
import { Router } from "express";

const gameController = Router();
gameController.get("/games", getGames);
gameController.post("/games", gameValidation, checkGameExistence, addGame);

export default gameController;