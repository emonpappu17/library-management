import express, { Application } from "express";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";

const app: Application = express();
app.use(express.json());

app.use("/books", bookRoutes)
app.use("/borrow", borrowRoutes)

export default app;