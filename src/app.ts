import express,{ Application, Request, Response } from "express";
import { BooksRoute } from "./app/controllers/book.controllers";
import { BorrowRoute } from "./app/controllers/borrow.controllers";
import errorHandler from "./app/middlewares/errorHandler";


const app: Application = express();
app.use(express.json())

app.use("/api", BooksRoute)
app.use("/api", BorrowRoute)

app.use(errorHandler);


app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Library Management Website');
});


export default app;