//var data=[{item:'get milk'},{item:'read newspaper'},{item:'do homework'}];
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Connect to the database
mongoose.connect('mongodb://test:test@ds135757.mlab.com:35757/todo-app-nodejs')

//Create a Schema
var todoSchema = mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app){

  //handle get request
  app.get('/todo', function(req,res){
    Todo.find({}, function(err, data){
      if(err) throw err;
      res.render('todo',{todos:data});
    });
  });

  //handle post request
  app.post('/todo', urlencodedParser, function(req,res){
    //get data from the view and add it to the Database
    var newTodo = Todo(req.body).save(function(err, data){
      if(err) throw err;
        res.json(data);
    });
  });

  //handle delete request
  app.delete('/todo/:item', function(req,res){
    //Remove the data from the database
    Todo.find({item: req.params.item.replace(/\-/g,' ')}).remove(function(err, data){
      if(err) throw err;
      res.json(data);
    });
  });
};
