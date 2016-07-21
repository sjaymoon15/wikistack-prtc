var Sequelize = require("sequelize");
var db = new Sequelize("postgres://localhost:5432/re2-wikistack", {
	logging: false
});

var Page = db.define("page",{
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	urlTitle: {
		type:Sequelize.STRING,
		allowNull: false
	},
	content: {
		type:Sequelize.TEXT,
		allowNull: false
	},
	status: {
		type:Sequelize.ENUM("open", "closed")
	},
	date: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
}, {
	getterMethods: {
		route: function(){     //where do we use this?
			return "/wiki/" + this.urlTitle;
		}
	},
	hooks:{
		beforeValidate: function(page){
			page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
		}
	}
});

var User = db.define("user",{
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = {
	Page: Page,
	User: User
};