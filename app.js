var express = require('express');
var todoController = require('./controllers/todoController.js');
var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//firing contoller
todoController(app);

//listen to port
app.listen(1900);
console.log('Port Running=1900');
