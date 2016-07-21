var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get("/", function(req, res, next){
	Page.findAll({})
	.then(function(pages){
		res.render("index.html", {pages: pages});
	})
	.catch(next);
	// res.redirect("/");
})

router.post("/", function(req, res, next){

	User.findOrCreate({
		where: {
			name: req.body.name,
			email: req.body.email
		}
	})
	.spread(function(user, wasCreated){
		return Page.create({
			title: req.body.title,
			content: req.body.content
		})
		.then(function(page){
			return page.setAuthor(user);
		})
	})
	.then(function(page){
		res.redirect(page.route);
	})
	.catch(next);
})

router.get("/add", function(req, res, next){
	res.render("addpage");
})

router.get("/:urlTitle", function(req, res, next){
	Page.findOne({
		where: {
			urlTitle: req.params.urlTitle
		},
		include: [
			{model: User, as: 'author'}
		]
	})
	// .then(function(page){
	// 	return page.getAuthor();
	// })
	.then(function(page){
		res.render('wikipage', {page: page});
	})
	.catch(next);
})







module.exports = router;
