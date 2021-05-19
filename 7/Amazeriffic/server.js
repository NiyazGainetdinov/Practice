var express = require("express"),
	http = require("http"),
	mongoose = require("mongoose"),
	app = express(); 
app.use(express.static(__dirname + "/client"));
// Это модель Mongoose для задач
var ToDoSchema = mongoose.Schema({
	description: String,
	tags: [ String ]
});
var ToDo = mongoose.model("ToDo", ToDoSchema);
http.createServer(app).listen(3000);
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost/amazeriffic');