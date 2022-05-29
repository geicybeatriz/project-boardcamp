import { getAllCategories, addCategories } from "../Controllers/categoriesController.js";
import { categoryValidation } from "../Middlewares/categoriesValidation.js";
import { Router } from "express";

const categoriesController = Router();
categoriesController.get("/categories", getAllCategories);
categoriesController.post("/categories", categoryValidation , addCategories);

export default categoriesController;