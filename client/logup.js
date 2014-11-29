Session.setDefault("logupType", "login");
Template.Logup.helpers({
	isLogin: function() {
		return Session.get("logupType") == "login";
	},
});

Template.Logup.events({
	"click .signup" : function() {
		Session.set("logupType", "signup");
	},
	"click .login" : function() {
		Session.set("logupType", "login");
	},

	"submit #loginForm" : function(e, t) {
		e.preventDefault();
		
		var email = t.$('[name=email]').val();
		var pwd = t.$('[name=pwd]').val();

		Meteor.loginWithPassword(email, pwd, function(err) {
    		  alert(err.reason);
		});
	},
	"submit #signupForm" : function(e, t) {
		e.preventDefault();
		
		var name = t.$('[name=name]').val();
		var email = t.$('[name=email]').val();
    		var pwd = t.$('[name=pwd]').val();
		
		// do validation
		
		var values = {
    		  profile: {name: name},
    		  email: email,
    		  password: pwd,
		}
		
		Accounts.createUser(values, function(err) {
    		  alert(err.reason);
		});
	}
});
