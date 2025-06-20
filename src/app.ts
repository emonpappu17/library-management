import express, { Application, Response, Request, NextFunction, ErrorRequestHandler } from "express";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";

const app: Application = express();

app.use(express.json());

// Route mounting
app.use("/api/books", bookRoutes)
app.use("/api/borrow", borrowRoutes)

// Not found route handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    })
})

// Global Error Handler 
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = 'Something went wrong';

    console.log('check--->', error);

    // Check for Mongoose Validation Error
    if (error.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation failed';
    }

    // MongoDB duplicate key error
    else if (error.code === 11000) {
        statusCode = 400;
        message = `Duplicate value for: isbn`;
        // message = `Duplicate value for: ${Object.keys(error.keyPattern).join(', ')}`;
    }

    res.status(statusCode).json({
        message,
        success: false,
        error
    });
})

export default app;