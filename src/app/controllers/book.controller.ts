import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";

export const bookRoutes = express.Router();

bookRoutes.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const book = await Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        })
    } catch (error: any) {
        // console.log('error log --->', error);
        // res.status(400).json({
        //     message: error.message,
        //     success: false,
        //     error: error
        // })
        console.log('from route-->', error);
        next(error)
    }
})

bookRoutes.get("/", (req: Request, res: Response, next: NextFunction) => {
    try {
        const { filter, sortBy, sort, limit = 10 } = req.query;
        console.log(filter, sortBy, sort, limit);
        const filterCondition = filter ? { genre: filter } : {};
        // const sortCondition = {}
        const sortCondition = { sortBy: sort === 'asc' ? 1 : -1 };

        console.log(filterCondition, sortCondition);


        res.send("book get")
    } catch (error) {
        next(error)
    }
})

