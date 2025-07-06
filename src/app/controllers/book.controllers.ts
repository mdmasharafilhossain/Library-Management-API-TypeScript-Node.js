import { NextFunction, Request, Response } from "express";
import express from 'express';
import { Book } from "../models/books.model";
import generalResponse from "../../utils/generalResponse";

export const BooksRoute = express.Router();



// Create a new book
BooksRoute.post("/books", async (req: Request, res: Response,PassError:NextFunction) => {
  try {
    const book = await Book.create(req.body); 
   generalResponse(res, 201, "Book created successfully", book);
  } catch (error) {
    PassError(error);
  }
});

// Get all books

// BooksRoute.get("/books", async (req: Request, res: Response,PassError:NextFunction) => {
//   try {

//       const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query;
//        const query: any = {};
//       if (filter){
//         query.genre = filter;
//       } 
//     const books = await Book.find(query).sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 }).limit(Number(limit)) || [] ;
//     generalResponse(res, 200, "Books retrieved successfully", books);
//   } catch (error) {
//     PassError(error);
//   }
// });
BooksRoute.get("/books", async (req: Request, res: Response, PassError: NextFunction) => {
  try {
    // 1️⃣  কুয়েরি প্যারাম পড়া
    const page    = parseInt(req.query.page as string)  || 1;
    const limit   = parseInt(req.query.limit as string) || 10;
    const sortBy  = (req.query.sortBy as string)        || "createdAt";
    const sortDir = (req.query.sort as string) === "asc" ? 1 : -1;
    const filter  = req.query.filter ? { genre: req.query.filter } : {};

    // 2️⃣  skip গণনা
    const skip = (page - 1) * limit;

    // 3️⃣  একই সঙ্গে list ও মোট কাউন্ট আনো
    const [books, total] = await Promise.all([
      Book.find(filter).sort({ [sortBy]: sortDir }).skip(skip).limit(limit),
      Book.countDocuments(filter)
    ]);

    // 4️⃣  meta সহ রেসপন্স
    generalResponse(res, 200, "Books retrieved successfully", {
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      },
      data: books
    });
  } catch (error) {
    PassError(error);
  }
});

// Get Book by ID 
BooksRoute.get("/books/:id", async (req: Request, res: Response,PassError:NextFunction) => {
  try {
    const book = await Book.findById(req.params.id);

    generalResponse(res, 200, "Book retrieved successfully", book);
  } catch (error) {
    PassError(error);
  }
});

// Update Book by id

BooksRoute.put("/books/:bookId", async (req:Request , res: Response , PassError:NextFunction)=>{
  try{
   const BookID = req.params.bookId 
    const book = await Book.findByIdAndUpdate(BookID, req.body, {new: true})
generalResponse(res, 200, "Book updated successfully", book);
  }catch(error){
    PassError(error)
  }
})


// Delete Book by id

BooksRoute.delete("/books/:bookId", async (req: Request, res: Response, PassError: NextFunction) => {
  try {

    
    const book = await Book.findByIdAndDelete(req.params.bookId);
    
    generalResponse(res, 200, "Book deleted successfully", null);
  } catch (error) {
    PassError(error);
  }
});

