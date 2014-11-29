Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'appBody',

  // the appNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'appLoading',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  waitOn: function() {
    return [
      Meteor.subscribe('directory')
    ];
  }
});

Router.route('/', {
    name: "directory",
    waitOn: function () {
        return Meteor.subscribe('directory');
      },
    
      data: function () {
        return Lists.find({});
      },
});

// force login
Router.onBeforeAction(function () {
  if (!Meteor.userId()) {
    this.render('Logup');
  } else {
    this.next();
  }
});
