const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');


const app = express();

const port = 3000;

var rawdata = fs.readFileSync('books.json');
var books = JSON.parse(rawdata);
var books = books.books;

app.listen(port, function(){
    console.log("Server is listening on port: " + port);
});


app.get("/", function(req, res){
    res.sendFile(__dirname + "/books.json");
});
