const express = require('express');
const cors = require('cors');
const { urlencoded, json } = require('body-parser');
const app = express();

// app.use( req,res, next => {
//  if (req.headers.authorization === "20210814"){
//    next();
//  }else {
//    res.send(401);
//  }
// });


let books = [
  {"ISBN" : "001", "title": "React", "author": "Austen, Jane", "edition": 1814, "publication": "Penguin"},
  {"ISBN" : "002", "title": "War and Peace", "author": "Tolstoy, Leo", "edition": 1865, "publication": "Penguin"},
  {"ISBN" : "003", "title": "Anna Karenina", "author": "Tolstoy, Leo", "edition": 1875, "publication": "Penguin"},
  {"ISBN" : "004", "title": "Mrs. Dalloway", "author": "Woolf, Virginia", "edition": 1925, "publication": "Harcourt Brace"},
  {"ISBN" : "005", "title": "The Hours", "author": "Cunnningham, Michael", "edition": 1999, "publication": "Harcourt Brace"},
  {"ISBN" : "006", "title": "Huckleberry Finn", "author": "Twain, Mark", "edition": 1865, "publication": "Penguin"},
  {"ISBN" : "007", "title": "Bleak House", "author": "Dickens, Charles", "edition": 1870, "publication": "Random House"},
  {"ISBN" : "008", "title": "Tom Sawyer", "author": "Twain, Mark", "edition": 1862, "publication": "Random House"},
  {"ISBN" : "009", "title": "A Room of One's Own", "author": "Woolf, Virginia", "edition": 1922, "publication": "Penguin"},
  {"ISBN" : "010", "title": "Harry Potter", "author": "Rowling, J.K.", "edition": 2000, "publication": "Harcourt Brace"},
  {"ISBN" : "011", "title": "One Hundred Years of Solitude", "author": "Marquez", "edition": 1967, "publication": "Harper  Perennial"},
  {"ISBN" : "012", "title": "Hamlet, Prince of Denmark", "author": "Shakespeare", "edition": 1603, "publication": "Signet  Classics"},
  {"ISBN" : "013", "title": "Lord of the Rings", "author": "Tolkien, J.R.", "edition": 1937, "publication": "Penguin"},
];

let reservedBooks = [];

let users = [
  {username: "test", password: "test", name: "Rodelio"},
  {username: "test2", password: "test2", name: "Rodelio2"},
  {username: "test2", password: "test2", name: "Rodelio3"},
]

let students = [
  {
    IDNum: '0001',
    firstName: 'Rodelio',
    lastName: 'Rodriguez',
    userName: 'dee-u',
    password: 'mahaba',
    confirmpassword: ''
  },
  {
    IDNum: '0002',
    firstName: 'Bill',
    lastName: 'Gates',
    userName: 'bill',
    password: 'mahaba',
    confirmpassword: ''
  }
];

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

//retrieve
app.get("/books", (req, res) =>{
  res.json({ data: books });
});

//add
app.post("/books", (req, res) => {
  books = [ req.body, ...books ]
  res.json({ data: books })
});

app.delete('/books/:ISBN', async (req, res) => {
  const ISBN = req.params.ISBN;
  const index = books.findIndex((book) => book.ISBN === ISBN);
  books.splice(index, 1);
  res.json({ data: books })
});

//update
app.put('/books/:ISBN', (req, res) => {
  const ISBN = req.params.ISBN;
  const index = books.findIndex((book) => book.ISBN === ISBN);
  books[index].ISBN = req.body.ISBN;
  books[index].title = req.body.title,
  books[index].author = req.body.author,
  books[index].edition = req.body.edition,
  books[index].publication = req.body.publication

  res.json({ data: books })
});


app.get("/books/search", (req, res) =>{
  const criteria = req.query.criteria;  
  let searchResult = books.filter(item => item.toLowerCase().indexOf(criteria) > -1);   
  res.json(searchResult);
});

app.post('/saveselection', (req,res) => {
  const newSelection = req.body.books;
  reservedBooks = newSelection;
  res.sendStatus(200)
});

//retrieve students
app.get("/students", (req, res) =>{
  res.json({ data: students });
});

//add student
app.post("/students", (req, res) => {
  students = [ req.body, ...students ]
  res.json({ data: students })
});

app.get("/books/reservations", (req, res) => {
  res.json(selectedFoods);
});

app.get("/checkuser", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  let nameOfUser = '';

  console.log("query", req.query);
  console.log("body" ,req.body);
  console.log("params", req.params);
  //console.log("req", req);
  //console.log("res", res);

  for(i=0; i < users.length; i++){
    if (users[i].username === username && users[i].password === password){
      nameOfUser=users[i].name;
      break;
    }
  }
  
  res.json(nameOfUser);
});

app.post('/clear/selection', (req, res) => {
    reservedFoods = [...[]];
    res.json(reservedFoods);
})

app.listen(8000, () => {
  console.log("Server is running and listening to port 8000");
})