Template.appBody.helpers({
  pageName: function () {
    return Session.get('pageName');
  },
  currentPath: function () {
    return Iron.Location.get().path;
  }
})
