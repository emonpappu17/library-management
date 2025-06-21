import { NextFunction, Request, Response } from "express";

// Borrow a Book
export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        console.log(req.body);
        res.send("borrow post")

    } catch (error) {

    }
}

