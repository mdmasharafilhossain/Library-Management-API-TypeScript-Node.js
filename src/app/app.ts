import express,{ Application } from "express";
import { BooksRoute } from "./controllers/book.controllers";
import { BorrowRoute } from "./controllers/borrow.controllers";
import errorHandler from "./middlewares/errorHandler";


const app: Application = express();
app.use(express.json())

app.use("/", BooksRoute)
app.use("/", BorrowRoute)

app.use(errorHandler);

export default app;