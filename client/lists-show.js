function isValidUrl(url) {
    // Copyright (c) 2010-2013 Diego Perini, MIT licensed
    // https://gist.github.com/dperini/729294
    // see also https://mathiasbynens.be/demo/url-regex
    // modified to allow protocol-relative URLs
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( url );
}

Template.listsShow.helpers({
    items: function () {
        return Items.find({listId: this._id}, {sort: {createdAt: 1}});
    },
    errors: function () {
      return Session.get('create_errors');
    },
    isUsersList: function (list) {
        if (!list || !Meteor.user()) {
            return false;
        }
        return list.userId == Meteor.userId();
    },
    comments: function () {
        return Comments.find({itemId: this._id}, {sort: {createdAt: 1}});
    },
    isUsersComment: function (comment) {
        if (!comment || !Meteor.user()) {
            return false;
        }
        return comment.userId == Meteor.userId();
    }
});

Template.listsShow.onCreated(function () {
  Session.set('pageName', this.data.name);
});

Template.listsShow.onDestroyed(function () {
  Session.set('pageName', null);
});

Template.listsShow.events({
    "submit #add-item" : function(e, t) {
        e.preventDefault();

        var item = {
            text: t.$('[name=item-text]').val(),
            url: t.$('[name=item-url]').val()
        };

        // Perform simple validations:
        // 1. Require a name for gift
        // 2. If URL provided, ensure it is a real address
        if (!item.text) {
          Session.set('create_errors', [{
            message: "Please enter a gift name"
          }]);
          return false;
        }
        if (item.url && !isValidUrl(item.url)) {
          Session.set('create_errors', [{
            message: "Please provide a valid URL"
          }]);
          return false;
        }
        Session.set('create_errors', []);

        Meteor.call('addItem', item, this._id);
        t.$('[name=item-text]').val('');
        t.$('[name=item-url]').val('');
    },
    "submit .add-comment" : function(e) {
        e.preventDefault();

        var input = $(e.target).find('[name=comment-text]');
        var text = input.val();
        Meteor.call('addComment', text, this._id);
        input.val('');
    },
    "click .delete-comment": function() {
        Meteor.call('deleteComment', this._id);
    },
    "click .delete-item": function() {
        Meteor.call('deleteItem', this._id);
    },
});

Template.listsShow.rendered = function(){

};
