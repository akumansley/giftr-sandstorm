Template.appBody.events({
    "click #signout" : function (e, t) {
        
        Meteor.logout(function (err) {
            if (err) {
                alert(err);
            }
        });
    },
});