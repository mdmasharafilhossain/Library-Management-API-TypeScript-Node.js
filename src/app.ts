import express,{ Application } from "express";
import { BooksRoute } from "./app/controllers/book.controllers";
import { BorrowRoute } from "./app/controllers/borrow.controllers";
import errorHandler from "./app/middlewares/errorHandler";


const app: Application = express();
app.use(express.json())

app.use("/", BooksRoute)
app.use("/", BorrowRoute)

app.use(errorHandler);



export default app;