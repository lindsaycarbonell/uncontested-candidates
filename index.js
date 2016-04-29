var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var data;
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));
app.set('view engine', 'ejs');

//this is where the magic happens
app.get('/', function(req,res){
   res.render('index', data);
  });


app.listen(8080, function(){
    console.log("App is listening on port 8080...");
});