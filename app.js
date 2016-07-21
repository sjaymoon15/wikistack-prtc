var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var swig = require("swig");
var models = require("./models");
var Page = models.Page;
var User = models.User;

app.use(morgan("combined"));

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
swig.setDefaults({cache: false});

app.use("/wiki", require("./routes/wiki"));

app.get("/", function(req, res){
	res.render("index");
})



Page.sync()
.then(function(){
	return User.sync();
})
.then(function(){
	app.listen(3000, function(){
		console.log("Listening on port 3000...");	
	})
})
.catch(function(err){
	console.error(err);
})