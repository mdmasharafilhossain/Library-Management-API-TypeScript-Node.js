import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from '../config';
import app from './app';


app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

const PORT = config.PORT 
async function main() {
  try {
    await mongoose.connect(config.DATABASE_URL as string)
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);    
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

main();