import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";

let server: Server;
const port = 5000;

async function main() {
    try {
        await mongoose.connect('mongodb+srv://libraryManagement:libraryManagement123@cluster0.aezqr.mongodb.net/libraryManagementDB?retryWrites=true&w=majority&appName=Cluster0')
        console.log('Connected to MongoDB using Mongoose');
        server = app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

main();