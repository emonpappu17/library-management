import express, { Application, Response, Request, NextFunction, ErrorRequestHandler } from "express";
import { bookRoutes } from "./app/routes/book.routes";
import { borrowRoutes } from "./app/routes/borrow.routes";

const app: Application = express();
app.use(express.json());

// ✅ Route Mounting
app.use("/api/books", bookRoutes)
app.use("/api/borrow", borrowRoutes)
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Welcome to library management API")
})

// ✅ Not Found
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    })
})

// ✅ Global Error Handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    // let statusCode = 500;
    let statusCode = error.statusCode || 500;
    // let message = 'Something went wrong';
    let message = error.message || 'Something went wrong'

    if (error.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation failed';
    }

    // MongoDB duplicate key error
    else if (error.code === 11000) {
        statusCode = 400;
        message = `Duplicate value for: isbn`;
    }

    res.status(statusCode).json({
        message,
        success: false,
        error
    });
})

export default app;