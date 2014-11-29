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
    }
});
