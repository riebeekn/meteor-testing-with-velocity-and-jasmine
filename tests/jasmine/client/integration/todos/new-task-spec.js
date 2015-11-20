describe ("the todo page : new task field", function() {
  
  beforeAll(function() {
    Package.testing.TestUser.login();
  });
  afterAll(function() {
    Package.testing.TestUser.logout();
  });

  afterEach(function() {
    Meteor.call('fixtures.destroyTasks');
  });
  
    it ("should create a new task on form submit with expected values", function(done) {
    // submit a new task
    Meteor.setTimeout(function() {
      addTaskViaUI('My new task');
      
      // check the updated task list
      var tasks = TodosSpecHelper.retrieveTasksFromUI();
      expect(tasks.length).toEqual(1);
      expect(tasks[0]).toEqual('Bob - My new task');

      // also check the DB
      var task = Tasks.findOne({text: 'My new task'});
      expect(task).not.toBe(undefined);
      expect(task.text).toEqual('My new task');
      expect(task.completed).toBe(false);
      expect(task.username).toEqual('Bob');
      expect(task.owner).toEqual(Meteor.userId());
      done();
    }, 400);
  });

  it ("should clear out the new task field on form submit", function(done) {
    Meteor.setTimeout(function() {  
      addTaskViaUI('Another new task');
      expect($('.new-task input').val()).toEqual('');
      done();
    }, 400);
  });
  
});

var addTaskViaUI = function(taskName) {
  $('.new-task input').val(taskName);
  $("form").submit();
}