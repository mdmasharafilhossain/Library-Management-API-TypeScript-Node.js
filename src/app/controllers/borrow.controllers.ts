
import express, { NextFunction, Request, Response } from 'express';
import { Borrow } from '../models/borrows.model';
import { Book } from '../models/books.model';
import generalResponse from '../../utils/generalResponse';

export const BorrowRoute = express.Router();

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

BorrowRoute.get("/api/borrow", async (req:Request, res:Response , PassError:NextFunction) => {
  try {
   const BorrowdBooksSummary = await Borrow.aggregate([
   {
    $group: {
      _id: '$book',
      totalQuantity: {$sum: '$quantity'}
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
        book:{
          title: '$bookDetails.title',
          isbn: '$bookDetails.isbn'
        },
         totalQuantity: 1
      }
    }


   ]);

   generalResponse(res, 200, 'Borrowed books summary retrieved successfully', BorrowdBooksSummary)
  } catch (error) {
    PassError(error);
  }
});