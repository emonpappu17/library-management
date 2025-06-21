import express from "express";
import { borrowBook } from "../controllers/borrow.controller";

export const borrowRoutes = express.Router();

borrowRoutes.post("/", borrowBook);
// borrowRoutes.get("/", getAllBooks);
