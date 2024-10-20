import express, { NextFunction, Router } from "express";
import { apiHealth } from "@controllers/ServerController";
const route: Router = express.Router();
//check api health
route.get("/health", apiHealth);

export { route };
