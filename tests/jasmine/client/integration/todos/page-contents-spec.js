describe ("the todo page : page contents", function() {

  describe ("for all users", function() {
    it ("should include a page title of 'Todo List'", function() {
      expect($('title').text()).toEqual('Todo List');
    });

    it ("should include a page heading of 'Todo List' appended " +
        "with the uncompleted task count", function(done) {
      Meteor.setTimeout(function() {
        expect($('h1').text()).toEqual('Todo List (0)');
        done();
      }, 400);
    });

    it ("should include an unordered list for displaying the tasks", function() {
      expect($('ul').length).toEqual(1);
    });

    it ("should include a checkbox for hiding completed tasks", function() {
      expect($('label.hide-completed').find('input:checkbox').length).toEqual(1);
    });

  });

  describe ("for logged in users", function() {

    beforeEach(function() {
      Package.testing.TestUser.login();
    });

    it ("should include a field for entering a new task " 
        + "with an appropriate placeholder", function(done) {
      Meteor.setTimeout(function() {
        expect($('.new-task input').attr('placeholder'))
          .toEqual('Type to add new tasks');
        done();
      }, 400);
    });

    it ("should include a logged in user link", function(done) {
      Meteor.setTimeout(function() {
        expect($('a#login-name-link').text()).toMatch("Bob");
        done();
      }, 400);
    });

  });

  describe ("for logged out users", function() {

    beforeEach(function() {
      Package.testing.TestUser.logout();
    });

    it ("should not include a field for entering a new task", function(done) {
      Meteor.setTimeout(function() {
        expect($('.new-task input').length).toEqual(0);
        done();
      }, 400);
    });

    it ("should include a login link", function(done) {
      Meteor.setTimeout(function() {
        expect($('a#login-sign-in-link').length).toEqual(1);
        done();
      }, 400);
    });
  });
  
});