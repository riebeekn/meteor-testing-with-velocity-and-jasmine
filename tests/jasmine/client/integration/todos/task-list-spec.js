describe ("the todo page : task list", function() {

  describe ("private tasks", function() {

    beforeAll(function() {
      Meteor.call('fixtures.createTask', {
        text: 'This is a private task', createdAt: '2015-01-01', private: true });
      Meteor.call('fixtures.createTask', {
        text: 'This is a public task', createdAt: '2015-02-01'}); 
    });
    afterAll(function() {
      Meteor.call('fixtures.destroyTasks');
    });
    
    it ("should not show up for non-signed in users", function(done) {
      Meteor.setTimeout(function() {
        Package.testing.TestUser.logout();
      }, 400);

      Meteor.setTimeout(function() {
        var tasks = TodosSpecHelper.retrieveTasksFromUI();

        expect(tasks.length).toEqual(1);
        expect(tasks[0]).toEqual('Bob - This is a public task');
        done();
      }, 800);
    });

    it ("should not show up for user's that do not own the task", function(done) {
      Meteor.setTimeout(function() {
        Package.testing.TestUser.login.Sally();
      }, 400);

      Meteor.setTimeout(function() {
        var tasks = TodosSpecHelper.retrieveTasksFromUI();

        expect(tasks.length).toEqual(1);
        expect(tasks[0]).toEqual('Bob - This is a public task');
        done();
      }, 800);
    });

    it ("should show up for the user that owns the task", function(done) {
      Meteor.setTimeout(function() {
        Package.testing.TestUser.login();
      }, 400);

      Meteor.setTimeout(function() {
        var tasks = TodosSpecHelper.retrieveTasksFromUI();

        expect(tasks.length).toEqual(2);
        expect(tasks[0]).toEqual('Bob - This is a public task');
        expect(tasks[1]).toEqual('Bob - This is a private task');
        done();
      }, 800);
    });

  });

  describe ("public tasks", function() {

    beforeEach(function() {
      Meteor.call('fixtures.createTask', {
        text: 'This is task 1', createdAt: '2015-01-01', completed: true});
      Meteor.call('fixtures.createTask', {text: 'This is task 2', createdAt: '2015-02-01'});
      Meteor.call('fixtures.createTask', {text: 'This is task 3', createdAt: '2015-03-01'});  
    });
    afterEach(function() {
      Meteor.call('fixtures.destroyTasks');
    });

    describe ("show all tasks", function() {

      it ("should contain the current list of tasks sorted by creation date " +
          "descending", function(done) {
        Meteor.setTimeout(function() {
          var tasks = TodosSpecHelper.retrieveTasksFromUI();

          expect(tasks.length).toEqual(3);
          expect(tasks[0]).toEqual('Bob - This is task 3');
          expect(tasks[1]).toEqual('Bob - This is task 2');
          expect(tasks[2]).toEqual('Bob - This is task 1');
          done();
        }, 400);
      });

    });

    describe ("show incomplete tasks only", function() {

      beforeEach(function() {
        // click the 'hide completed' checkbox to hide completed task
        $('label.hide-completed').find('input:checkbox').click();
      });
      afterEach(function() {
        // re-enable the showing of completed tasks so subsequent tests are not affected
        $('label.hide-completed').find('input:checkbox').click();
      });

      it ("should contain the current list of incompleted tasks sorted " +
          "by creation date descending", function(done) {
        Meteor.setTimeout(function() {
            var tasks = TodosSpecHelper.retrieveTasksFromUI();

            expect(tasks.length).toEqual(2);
            expect(tasks[0]).toEqual('Bob - This is task 3');
            expect(tasks[1]).toEqual('Bob - This is task 2');
            done();
          }, 400);
      });

    });

  });

});