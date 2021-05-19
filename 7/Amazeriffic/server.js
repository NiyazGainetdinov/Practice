var express = require("express"),
	http = require("http"),
	mongoose = require("mongoose"),
	app = express(); 
app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost/amazeriffic');