import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
dotenv.config();

import categoriesController from "./Routes/categoriesRoute.js";

const app = express();
app.use(cors());
app.use(json());

app.use(categoriesController);


const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(chalk.bold.green("Server online")));