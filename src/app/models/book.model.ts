import { Model, model, Schema } from "mongoose";
import { BookInstanceMethods, IBook } from "../interfaces/book.interface";
import { Borrow } from "./borrow.model";

// const bookSchema = new Schema<IBook, Model<IBook>, BookInstanceMethods>(
const bookSchema = new Schema<IBook>(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true,
            enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']
        },
        isbn: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String
        },
        copies: {
            type: Number,
            required: true,
            min: [0, 'Copies must be a positive number']
        },
        available: {
            type: Boolean,
            default: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

bookSchema.method("checkAvailability", function () {
    console.log('I am this method--->', this);
    this.available = this.copies > 0;
})

// bookSchema.pre("save", function (next) {
//     console.log('I am this pre--->', this);
//     this.checkAvailability();
//     next()
// })

// // Instance Method
// bookSchema.methods.checkAvailability = function () {
//     console.log('I am this method--->', this);
//     this.available = this.copies > 0;
// };

// // Middleware
// bookSchema.post('findByIdAndUpdate', async function (next) {
//     console.log('I am this pre--->', this);
//     this.checkAvailability();
//     next();
// });

// bookSchema.post("findOneAndDelete", async function (doc, next) {
//     if (doc) {
//         // console.log(doc);
//         await Borrow.deleteMany({ user: doc._id })
//     }
//     next()
// })

export const Book = model<IBook>("Book", bookSchema);