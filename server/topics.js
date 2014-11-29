Meteor.publish('directory', function() {
  return Lists.find({});
});

Meteor.publish('items', function(listId) {
  check(listId, String);

  return Items.find({listId: listId});
});
