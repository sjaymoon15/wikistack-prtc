var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get("/", function(req, res, next){
	res.redirect("/");
})

router.post("/", function(req, res, next){
	Page.create({
		title: req.body.title,
		content: req.body.content,
		status: req.body.status
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
		}
	})
	.then(function(page){
		res.render('wikipage', {page: page});
	})
	.catch(next);
})







module.exports = router;
