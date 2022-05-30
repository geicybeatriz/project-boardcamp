import { insertRental, getRentals } from "../Controllers/rentalsControllers.js";
import { rentalValidate } from "../Middlewares/rentalsValidation.js";
import { Router } from "express";

const rentalsController = Router();
rentalsController.get("/rentals", getRentals);
rentalsController.post("/rentals", rentalValidate, insertRental);

export default rentalsController;