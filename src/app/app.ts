import express,{ Application } from "express";
import { BooksRoute } from "./controllers/book.controllers";
import { BorrowRoute } from "./controllers/borrow.controllers";


const app: Application = express();
app.use(express.json())

app.use("/", BooksRoute)
app.use("/", BorrowRoute)