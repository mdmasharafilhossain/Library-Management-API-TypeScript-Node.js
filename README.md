# Library Management System 

A Library Management System built using **Express**, **TypeScript**, and **MongoDB** (with Mongoose).  
This system allows managing books, borrowing functionality, and provides summary reports using aggregation.

---

## Features

- Add, update, delete books
- Borrow books 
- Validation with Mongoose
- Filtering, sorting, and pagination
- Aggregation to summarize borrowed data
- Mongoose middleware, instance methods
- Proper error handling

---

## Technologies Used

- **Node.js** & **Express.js**
- **TypeScript**
- **MongoDB** & **Mongoose**
- **Postman** (for testing)
- **Dotenv** for environment config

---

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/mdmasharafilhossain/Library-Management-TypeScript-Node.js.git 
cd Library-Management-TypeScript-Node
```

### 2. Install dependencies


```bash
npm install
```

### 3. Create .env file
Create a .env file in the root directory and add:

```bash
DATABASE_URL='mongodb+srv://Library-ts:9IcNEXWJGTLjR0IL@cluster0.lzichn4.mongodb.net/Library-Ts?retryWrites=true&w=majority&appName=Cluster0'
PORT=3000
```

### 4. Run the project


```bash
npm run dev
```

## API Endpoints

### Books



### Create a Book 

**POST** `/api/books`
### Get All Books 

**GET** `/api/books`
### Get Book by ID

**GET** `/api/books/:bookId`
### Update Book

**PUT** `/api/books/:bookId`
### Delete Book

**DELETE** `/api/books/:bookId`


### Borrow Books

### Borrow Book

**POST** `/api/borrow`
### Borrow Books Summary

**GET** `/api/borrow`




