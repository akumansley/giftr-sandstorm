Template.listsShow.helpers({
    items: function() {
        return Items.find({listId: this._id}, {sort: {createdAt: 1}});
    },
    isUsersList: function (list) {
        return list.userId == Meteor.user()._id;
    },
    comments: function() {
        return Comments.find({itemId: this._id}, {sort: {createdAt: 1}});
    }
});

Template.listsShow.events({
    "submit #add-item" : function(e, t) {
        e.preventDefault();
        
        var text = t.$('[name=item-text]').val();
        var item = {
            text: text,
            listId: this._id,
            createdAt: new Date()
        };

        // TODO replace this with a method add-item
        Items.insert(item);
        t.$('[name=item-text]').val('');
    },
    "submit .add-comment" : function(e, t) {
        e.preventDefault();
        
        var input = $(e.target).find('[name=comment-text]');        
        var text = input.val();
        var comment = {
            userId: Meteor.user()._id,
            text: text,
            itemId: this._id,
            listId: this.listId,
            createdAt: new Date()
        };
    
        // TODO replace this with a method add-item
        Comments.insert(comment);
        input.val('');
    }
    
});