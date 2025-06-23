
import express, { NextFunction, Request, Response } from 'express';
import { Borrow } from '../models/borrows.model';
import { Book } from '../models/books.model';
import generalResponse from '../../utils/generalResponse';
import mongoose from 'mongoose';

export const BorrowRoute = express.Router();

BorrowRoute.post("/borrow", async (req: Request, res: Response, PassError: NextFunction) => {
  try {
    const { book, quantity, dueDate } = req.body;
    const RequestBook = await Book.findById(book);

    
    if (!RequestBook || RequestBook.copies < quantity) {
      const validationError = new mongoose.Error.ValidationError();

      validationError.addError('copies', new mongoose.Error.ValidatorError({
        message: 'Not enough copies available!',
        path: 'copies',
        value: quantity,
        type: 'min'
      }));

      throw validationError;
    }

    if(quantity < 0){
       const validationError = new mongoose.Error.ValidationError();

      validationError.addError('copies', new mongoose.Error.ValidatorError({
        message: 'Copies must be a positive number',
        path: 'copies',
        value: quantity,
        type: 'min'
      }));

      throw validationError;
    }

    RequestBook.copies -= quantity;
    await RequestBook.updateAvailabilityStatus();

    const borrow = await Borrow.create({ book, quantity, dueDate });

    generalResponse(res, 200, 'Book borrowed successfully', borrow);
  } catch (error) {
    PassError(error); 
  }
});

BorrowRoute.get("/borrow", async (req:Request, res:Response , PassError:NextFunction) => {
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