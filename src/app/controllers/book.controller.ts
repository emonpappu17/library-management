import express, { Request, Response } from "express";

export const bookRoutes = express.Router();

bookRoutes.get("/", (req: Request, res: Response) => {
    res.send("book get")
})

