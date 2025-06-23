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
exports.BorrowRoute = void 0;
const express_1 = __importDefault(require("express"));
const borrows_model_1 = require("../models/borrows.model");
const books_model_1 = require("../models/books.model");
const generalResponse_1 = __importDefault(require("../../utils/generalResponse"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.BorrowRoute = express_1.default.Router();
exports.BorrowRoute.post("/api/borrow", (req, res, PassError) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        const RequestBook = yield books_model_1.Book.findById(book);
        if (!RequestBook || RequestBook.copies < quantity) {
            const validationError = new mongoose_1.default.Error.ValidationError();
            validationError.addError('copies', new mongoose_1.default.Error.ValidatorError({
                message: 'Not enough copies available!',
                path: 'copies',
                value: quantity,
                type: 'min'
            }));
            throw validationError;
        }
        if (quantity < 0) {
            const validationError = new mongoose_1.default.Error.ValidationError();
            validationError.addError('copies', new mongoose_1.default.Error.ValidatorError({
                message: 'Copies must be a positive number',
                path: 'copies',
                value: quantity,
                type: 'min'
            }));
            throw validationError;
        }
        RequestBook.copies -= quantity;
        yield RequestBook.updateAvailabilityStatus();
        const borrow = yield borrows_model_1.Borrow.create({ book, quantity, dueDate });
        (0, generalResponse_1.default)(res, 200, 'Book borrowed successfully', borrow);
    }
    catch (error) {
        PassError(error);
    }
}));
exports.BorrowRoute.get("/api/borrow", (req, res, PassError) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const BorrowdBooksSummary = yield borrows_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' }
                },
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookDetails'
                }
            },
            {
                $unwind: '$bookDetails'
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: '$bookDetails.title',
                        isbn: '$bookDetails.isbn'
                    },
                    totalQuantity: 1
                }
            }
        ]);
        (0, generalResponse_1.default)(res, 200, 'Borrowed books summary retrieved successfully', BorrowdBooksSummary);
    }
    catch (error) {
        PassError(error);
    }
}));
