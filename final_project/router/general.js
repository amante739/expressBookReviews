const express = require('express');
const axios = require("axios");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Task 1 Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));

  //return res.status(200).json({message: "Yet to be implemented"});
});

// TASK 10 - Get the book list available in the shop using  async-await with Axios 
public_users.get("/book", async function (req, res) {
  try {
    const response = await axios.get("http://localhost:5000");
    const books = response.data;
    res.send(JSON.stringify(books, null, 4));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
// Task 2 Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here

    const isbn = req.params.isbn;
    res.send(books[isbn])
    //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// TASK 11 - Get book details based on ISBN  async-await with Axios 
public_users.get("/book/:isbn", async function (req, res) {
  const { isbn } = req.params;

  try {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    const book = response.data;
    res.send(JSON.stringify(book, null, 4));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//Task 3 Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let authorParam=req.params.author;
  let bookKeys = Object.keys(books);  
  bookKeys.forEach((key) => {
    const book = books[key];
    if (book.author === authorParam) {
      //matchingBooks.push(book);
      res.send(book);
    }
  });
  
  //return res.status(300).json({message: "Yet to be implemented"});
});
// TASK 12 - Get book details based on Author async-await with Axios 
public_users.get("/book/author/:author", async function (req, res) {
  const { author } = req.params;;

  try {
    const response = await axios.get(
      `http://localhost:5000/author/${author}`
    );
    
    const book = response.data;
    res.send(JSON.stringify(book, null, 4));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
//Task 4 Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let titleParam=req.params.title;
    let bookKeys = Object.keys(books);  
    bookKeys.forEach((key) => {
      const book = books[key];
      if (book.title === titleParam) {
        //matchingBooks.push(book);
        res.send(book);
      }
    });
 // return res.status(300).json({message: "Yet to be implemented"});
});
// TASK 13 - Get book details based on Author async-await with Axios 
public_users.get("/book/title/:title", async function (req, res) {
  const { title } = req.params;;

  try {
    const response = await axios.get(
      `http://localhost:5000/title/${title}`
    );
    
    const book = response.data;
    res.send(JSON.stringify(book, null, 4));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbnParam=req.params.isbn;
  const book=books[isbnParam];
  const reviews = book.reviews; // Accessing the reviews object
 res.send(reviews);

});

module.exports.general = public_users;
