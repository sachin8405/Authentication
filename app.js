require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});


userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });


  const user = new mongoose.model('user', userSchema);

app.get("/", function(req, res){
  res.render("home");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});
app.get("/logout", function(req, res){
res.render("home");
});

app.post("/register", function(req, res){
  const newUser = new user({
    email: req.body.username,
    password: req.body.password
  });
  newUser.save(function(error){
    if(!error){
      res.render("secrets");
    } else {
      console.log(err);
    }
  });
});

app.post("/login", function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  user.findOne({email:username}, function(error, foundUser){
    if(foundUser){
      if (foundUser.password === password);
      res.render("secrets");
    } else {
      console.log(err);
    }
  });
});

app.post("/logout", function(req, res){
  res.render("home");
});






app.listen(3000, function(){
  console.log("server is running on port 3000");
});
