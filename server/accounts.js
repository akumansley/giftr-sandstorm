Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        user.profile = options.profile;
    }  

    Lists.insert({
        name: user.profile.name + "\'s list", 
        userId: user._id
    }, function(err, _id) {
        if (err) {
            alert(err.reason);
        }
    });

    return user;
});