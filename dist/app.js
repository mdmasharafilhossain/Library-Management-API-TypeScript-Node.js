"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controllers_1 = require("./app/controllers/book.controllers");
const borrow_controllers_1 = require("./app/controllers/borrow.controllers");
const errorHandler_1 = __importDefault(require("./app/middlewares/errorHandler"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'live-deploy-url']
}));
app.use(express_1.default.json());
app.use("/api", book_controllers_1.BooksRoute);
app.use("/api", borrow_controllers_1.BorrowRoute);
app.use(errorHandler_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to Library Management Website');
});
exports.default = app;
