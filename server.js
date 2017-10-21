var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express()
var PORT = process.env.PORT || 3000
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/' , function(reg, res) {
res.send('Todo API Root')
});

app.get('/todos' , function(req, res) {
	res.json(todos);
});

app.get('/todos/:id' , function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo;

	todos.forEach(function(todo) {
		if (todo.id === todoId) {
			matchedTodo = todo;
		}
	});

	if(matchedTodo) {
			res.json(matchedTodo);
		} else {
			res.status(404).send();
		}
});

//POST
app.post('/todos', function(req, res) {
	var body = req.body;

	//add id field
	body.id = todoNextId;
	todoNextId++;

	//push body into array
	todos.push(body)

	res.json(body);
});

app.listen(PORT, function () {
	console.log('Express is running on port ' + PORT);
})