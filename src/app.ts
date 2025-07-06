import express,{ Application, Request, Response } from "express";
import { BooksRoute } from "./app/controllers/book.controllers";
import { BorrowRoute } from "./app/controllers/borrow.controllers";
import errorHandler from "./app/middlewares/errorHandler";
import cors from 'cors';
const app: Application = express();
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://library-management-sigma-nine.vercel.app/', 'https://library-management-sigma-nine.vercel.app']
   })
);

app.use(express.json())

app.use("/api", BooksRoute)
app.use("/api", BorrowRoute)

app.use(errorHandler);


app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Library Management Website');
});


export default app;