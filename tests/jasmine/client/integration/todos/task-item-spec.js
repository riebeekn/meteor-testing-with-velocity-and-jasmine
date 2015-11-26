describe ("the todo page : an individual task item", function() {

  describe ("which the current user owns", function() {

    beforeEach(function() {
      Package.testing.TestUser.login();
      Meteor.call('fixtures.createTask');
    });
    afterEach(function() {
      Package.testing.TestUser.logout();
      Meteor.call('fixtures.destroyTasks');
    });

    it ("should show the public / private button", function(done) {
      Meteor.setTimeout(function() {
        var tasks = TodosSpecHelper.retrieveTasksFromUI();

        var privateButton = $('.toggle-private');
        expect(privateButton.length).toEqual(1);
        done();
      }, 400);
    });

  });

  describe ("which the current user does not own", function() {

    beforeEach(function() {
      Package.testing.TestUser.login();
      Meteor.call('fixtures.createTask', { owner: 'Joe' });
    });
    afterEach(function() {
      Package.testing.TestUser.logout();
      Meteor.call('fixtures.destroyTasks');
    });

    it ("should not show the public / private button", function(done) {
      Meteor.setTimeout(function() {
        var tasks = TodosSpecHelper.retrieveTasksFromUI();

        var privateButton = $('.toggle-private');
        expect(privateButton.length).toEqual(0);
        done();
      }, 400);
    });

  });

  describe ("private tasks", function() {

    beforeEach(function() {
      Package.testing.TestUser.login(); // note need to login so can see task
      Meteor.call('fixtures.createTask', { private: true });
    });
    afterEach(function() {
      Package.testing.TestUser.logout();
      Meteor.call('fixtures.destroyTasks');
    });

    it ("should display with a grey background", function(done) {
      Meteor.setTimeout(function() {
        expect($("li").hasClass('private')).toBe(true);
        done();
      }, 400);
    });

  });

  describe ("any task", function() {

    beforeEach(function() {
      Meteor.call('fixtures.createTask', {
        text: 'The task'
      });
    });
    afterEach(function() {
      Meteor.call('fixtures.destroyTasks');
    });

    it ("should include the name of the user who created "
        + "the task along with the task text", function(done) {
      Meteor.setTimeout(function() {
        var tasks = TodosSpecHelper.retrieveTasksFromUI();

        expect(tasks.length).toEqual(1);
        expect(tasks[0]).toEqual('Bob - The task');
        done();
      }, 400);
    });

    it ("should include a checkbox to mark the task as complete", function(done) {
      Meteor.setTimeout(function() {
        var checkbox = $('li').find("input:checkbox");
        expect(checkbox.length).toEqual(1);
        done();
      }, 400);
    });

    it ("should include a delete button", function(done) {
      Meteor.setTimeout(function() {
        var deleteButton = $('.delete');
        expect(deleteButton.length).toEqual(1);
        done();
      }, 400);
    });

  });
  
});