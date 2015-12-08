Template.Directory.helpers({
    lists: function () {
        return Lists.find({});
    },
    userHasList: function () {
      return Lists.find({userId: Meteor.userId()}).count() > 0;
    }
});

Template.Directory.events({
    "click #make-list" : function(e, t) {
        e.preventDefault();

        var text = t.$('[name=item-text]').val();

        Meteor.call('makeList');
    }
});
