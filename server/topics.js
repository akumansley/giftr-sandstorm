Meteor.publish('directory', function() {
  return Lists.find({});
});

Meteor.publish('items', function(listId) {
  check(listId, String);

  return Items.find({listId: listId});
});

Meteor.publish('comments', function(listId) {
  check(listId, String);
  
  var list = Lists.findOne({_id: listId});

  // no comments for your own list
  if (this.userId == list.userId) {
    this.ready();
    return null;
  } else {
    return Comments.find({listId: listId});
  }
});

Meteor.publish('users', function() {
  return Meteor.users.find({});
});