TestUser = {}

TestUser.login = function() {
  if (!Meteor.user())
  {
    Meteor.loginWithPassword('Bob', 'foobar', function(err) {
      if (err) {
        console.log('Login error: ' + err);
      }
    });
  }
}

TestUser.logout = function() {
  if (Meteor.user()) {
    Meteor.logout();
  }
}