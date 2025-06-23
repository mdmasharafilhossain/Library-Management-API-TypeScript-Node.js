import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interfaces";



const bookSchema = new Schema<IBook>({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        enum: ['FICTION', 'NON-FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
        required: true

    },
    isbn:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        
    },
    copies:{
        type: Number,
        required: true,
        min: 0
    },
    available:{
        type: Boolean,
        Defaults : true,
        
    },
     
     
}, {
    timestamps: true,});

    bookSchema.methods.updateAvailabilityStatus = function () {
    this.available = this.copies > 0
    return this.save();
};

bookSchema.pre('save', function (next) {
  this.available = this.copies > 0;
  next();
});

export const Book = model<IBook>('Book', bookSchema);