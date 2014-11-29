Meteor.methods({
    addItem: function (text, listId) {
        var list = Lists.findOne(listId);
        if (!list || !Meteor.user() || list.userId != Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        
        var item = {
            text: text,
            listId: listId,
            createdAt: new Date()
        };
        Items.insert(item);
    },
    deleteItem: function (itemId) {
        var item = Items.findOne(itemId);
        var list = Lists.findOne(item.listId);
        if (list.userId != Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Items.remove(itemId)
    },
    addComment: function (text, itemId) {
        var item = Items.findOne(itemId);
        var list = Lists.findOne(item.listId);
        
        if (!item || !list ||!Meteor.user() || list.userId == Meteor.user()._id) {
            throw new Meteor.Error("not-authorized");
        }
        
        var comment = {
            userId: Meteor.userId(),
            text: text,
            itemId: item._id,
            listId: item.listId,
            createdAt: new Date()
        };
        
        Comments.insert(comment);
    },
    deleteComment: function (commentId) {
        var comment = Comments.findOne(commentId);
        if (comment.userId != Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Comments.remove(commentId);
    }
    
    
});