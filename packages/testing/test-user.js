TestUser = {}

TestUser.login = function() {
  performLogin('Bob');
}

TestUser.login.Sally = function() {
  performLogin('Sally');
}

TestUser.logout = function() {
  if (Meteor.user()) {
    Meteor.logout();
  }
}

var performLogin = function(user) {
  Meteor.loginWithPassword(user, 'foobar', function(err) {
    if (err) {
      console.log('Login error: ' + err);
    }
  });
}