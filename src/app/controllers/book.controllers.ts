import { NextFunction, Request, Response } from "express";
import express from 'express';
import { Book } from "../models/books.model";
import generalResponse from "../../utils/generalResponse";

export const BooksRoute = express.Router();



// Create a new book
BooksRoute.post("/api/books", async (req: Request, res: Response,PassError:NextFunction) => {
  try {
    const book = await Book.create(req.body); 
   generalResponse(res, 201, "Book created successfully", book);
  } catch (error) {
    PassError(error);
  }
});

// Get all books

BooksRoute.get("/api/books", async (req: Request, res: Response,PassError:NextFunction) => {
  try {

      const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query;
       const query: any = {};
      if (filter){
        query.genre = filter;
      } 
    const books = await Book.find(query).sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 }).limit(Number(limit)) || [] ;
    generalResponse(res, 200, "Books retrieved successfully", books);
  } catch (error) {
    PassError(error);
  }
});


// Get Book by ID 
BooksRoute.get("/api/books/:id", async (req: Request, res: Response,PassError:NextFunction) => {
  try {
    const book = await Book.findById(req.params.id);

    generalResponse(res, 200, "Book retrieved successfully", book);
  } catch (error) {
    PassError(error);
  }
});

// Update Book by id

BooksRoute.put("/api/books/:bookId", async (req:Request , res: Response , PassError:NextFunction)=>{
  try{
   const BookID = req.params.bookId 
    const book = await Book.findByIdAndUpdate(BookID, req.body, {new: true})
generalResponse(res, 200, "Book updated successfully", book);
  }catch(error){
    PassError(error)
  }
})


// Delete Book by id

BooksRoute.delete("/api/books/:bookId", async (req: Request, res: Response, PassError: NextFunction) => {
  try {

    
    const book = await Book.findByIdAndDelete(req.params.bookId);
    
    generalResponse(res, 200, "Book deleted successfully", null);
  } catch (error) {
    PassError(error);
  }
});

