import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";

export const bookRoutes = express.Router();

// Create Book
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
        next(error)
    }
})

// Get All Books
bookRoutes.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = 10 } = req.query;

        const filterCondition = filter ? { genre: filter } : {};

        const sortOrder = sort === 'asc' ? 1 : -1;

        const books = await Book.find(filterCondition).sort({ [sortBy as string]: sortOrder }).limit(Number(limit));

        res.json({
            success: true,
            message: books.length > 0
                ? "Books retrieved successfully"
                : "No books found matching the criteria",
            data: books
        })
    } catch (error) {
        next(error)
    }
})

// Get Book by ID
bookRoutes.get("/:bookId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.bookId;
        const book = await Book.findById(id);
        console.log('book-=---->', book);
        // if (!book) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Book not found",
        //         error: {
        //             name: "NotFoundError",
        //             path: "bookId",
        //             message: `Book with ID ${id} does not exist`
        //         }
        //     });
        // }

        res.json({
            success: true,
            message: "Book retrieved successfully",
            data: book
        })

    } catch (error) {
        next(error)
    }
})




