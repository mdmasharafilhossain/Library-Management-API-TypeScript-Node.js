"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksRoute = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
const generalResponse_1 = __importDefault(require("../../utils/generalResponse"));
exports.BooksRoute = express_1.default.Router();
// Create a new book
exports.BooksRoute.post("/books", (req, res, PassError) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield books_model_1.Book.create(req.body);
        (0, generalResponse_1.default)(res, 201, "Book created successfully", book);
    }
    catch (error) {
        PassError(error);
    }
}));
// Get all books
exports.BooksRoute.get("/books", (req, res, PassError) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sortBy = req.query.sortBy || "createdAt";
        const sortDir = req.query.sort === "asc" ? 1 : -1;
        const filter = req.query.filter ? { genre: req.query.filter } : {};
        const skip = (page - 1) * limit;
        const [books, total] = yield Promise.all([
            books_model_1.Book.find(filter).sort({ [sortBy]: sortDir }).skip(skip).limit(limit),
            books_model_1.Book.countDocuments(filter)
        ]);
        (0, generalResponse_1.default)(res, 200, "Books retrieved successfully", {
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            },
            data: books
        });
    }
    catch (error) {
        PassError(error);
    }
}));
// Get Book by ID 
exports.BooksRoute.get("/books/:id", (req, res, PassError) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield books_model_1.Book.findById(req.params.id);
        (0, generalResponse_1.default)(res, 200, "Book retrieved successfully", book);
    }
    catch (error) {
        PassError(error);
    }
}));
// Update Book by id
exports.BooksRoute.put("/books/:bookId", (req, res, PassError) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const BookID = req.params.bookId;
        const book = yield books_model_1.Book.findByIdAndUpdate(BookID, req.body, { new: true });
        (0, generalResponse_1.default)(res, 200, "Book updated successfully", book);
    }
    catch (error) {
        PassError(error);
    }
}));
// Delete Book by id
exports.BooksRoute.delete("/books/:bookId", (req, res, PassError) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield books_model_1.Book.findByIdAndDelete(req.params.bookId);
        (0, generalResponse_1.default)(res, 200, "Book deleted successfully", null);
    }
    catch (error) {
        PassError(error);
    }
}));
