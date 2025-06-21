import { model, Schema } from "mongoose";



const bookSchema = new Schema({
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

    bookSchema.methods.updateAvailabilityStatus = function (this: any) {
    this.available = this.copies > 0
    return this.save();
};

export const Book = model('Book', bookSchema);