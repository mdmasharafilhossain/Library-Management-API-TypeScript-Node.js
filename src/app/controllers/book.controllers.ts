import { Request, Response } from "express";
import express from 'express';
import { Book } from "../models/books.model";

const BooksRoute = express.Router();

BooksRoute.post("/api/books", async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body); 
    res.status(201).json({ message: "Book created successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the book" });
  }
});

