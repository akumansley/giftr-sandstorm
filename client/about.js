Template.About.onCreated(function () {
    Session.set('pageName', 'About');
});

Template.About.onDestroyed(function () {
    Session.set('pageName', null);
});
