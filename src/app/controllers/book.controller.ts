import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const bookRoutes = express.Router();

bookRoutes.post("/", async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const book = await Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        })
    } catch (error: any) {
        console.log('error log --->', error);
        res.status(400).json({
            message: error.message,
            success: false,
            error: error
        })
    }
})
bookRoutes.get("/", (req: Request, res: Response) => {
    res.send("book get")
})

