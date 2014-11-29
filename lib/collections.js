Lists = new Meteor.Collection('lists');
Items = new Meteor.Collection('items');

Comment = {
    user: function () {
        return Meteor.users.findOne(this.userId);
    }
}

Comments = new Meteor.Collection('comments', {
    transform: function (doc) {
        var newInstance = Object.create(Comment);
        return  _.extend(newInstance, doc);
    },
});