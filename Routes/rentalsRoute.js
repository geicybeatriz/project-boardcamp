import { insertRental, getRentals, finishRental, deleteRental } from "../Controllers/rentalsControllers.js";
import { rentalValidate } from "../Middlewares/rentalsValidation.js";
import { Router } from "express";

const rentalsController = Router();
rentalsController.get("/rentals", getRentals);
rentalsController.post("/rentals", rentalValidate, insertRental);
rentalsController.post("/rentals/:id/return", finishRental);
rentalsController.delete("/rentals/:id", deleteRental);

export default rentalsController;