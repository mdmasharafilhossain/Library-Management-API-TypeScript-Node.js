"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
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
        enum: ['FICTION', 'NON-FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    copies: {
        type: Number,
        required: true,
        min: 0
    },
    available: {
        type: Boolean,
        Defaults: true,
    },
}, {
    timestamps: true,
});
bookSchema.methods.updateAvailabilityStatus = function () {
    this.available = this.copies > 0;
    return this.save();
};
bookSchema.pre('save', function (next) {
    this.available = this.copies > 0;
    next();
});
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
