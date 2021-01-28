const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 3000;
const bookFile = "books.json";

app.use(bodyParser.json());

var rawdata = fs.readFileSync(bookFile);
var books = JSON.parse(rawdata);

app.listen(port, function () {
  console.log("Server is listening on port: " + port);
});

app.get("/", function (req, res) {
  var id = req.query.id;
  if (typeof id === "undefined") {
    res.sendFile(__dirname + "/books.json");
  } else {
    if (id > 0) {
      res.send(books[id - 1]);
    } else {
      res.status(404).send("Something went wrong!");
    }
  }
});

app.post("/", function (req, res) {
  if (Object.entries(req.body).length === 0) {
    res.status(400).send("Your POST request is empty");
  } else {
    var newBook = req.body;
    books.push(newBook);
    console.log(books);
    var newBookData = JSON.stringify(books, null, 2);
    fs.writeFileSync(bookFile, newBookData);
  }
});
