import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(chalk.bold.green("Server online")));