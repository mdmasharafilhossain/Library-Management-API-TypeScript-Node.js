
import express, { NextFunction, Request, Response } from 'express';
import { Borrow } from '../models/borrows.model';
import { Book } from '../models/books.model';
import generalResponse from '../../utils/generalResponse';

const BorrowRoute = express.Router();

BorrowRoute.post("/api/borrow", async (req:Request, res:Response , PassError:NextFunction) => {
  try {
    const {book, quantity, dueDate} = req.body;
    const RequestBook = await Book.findById(book);
    
    if(!RequestBook || RequestBook.copies < quantity) {
      throw new Error('Not enough copies available!!!');
    }
RequestBook.copies -= quantity;
await RequestBook.updateAvailabilityStatus();

const borrow = Borrow.create({book, quantity, dueDate});
generalResponse(res, 200, 'Book borrowed successfully', borrow);
  } catch (error) {
    PassError(error);
  }
});