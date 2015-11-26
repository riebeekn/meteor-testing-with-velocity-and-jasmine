Meteor.startup(function() {
  
  // Disable rate limiting for our test users
  //
  // As per docs.meteor.com/#/full/ddpratelimiter, "the default limits 
  // login attempts, new user creation, and password resets to 
  // 5 attempts every 10 seconds per connection"
  //
  // With rate limiting enabled, our tests will fail as we
  // are logging in / logging more than 5x per 10 seconds
  Accounts.removeDefaultRateLimit();

  var user = Meteor.users.findOne({username: 'Bob'});
  if (!user) {
    Accounts.createUser({
      username: 'Bob',
      password : 'foobar'
    });
  }

  user = Meteor.users.findOne({username: 'Sally'});
  if (!user) {
    Accounts.createUser({
      username: 'Sally',
      password: 'foobar'
    });
  }
});