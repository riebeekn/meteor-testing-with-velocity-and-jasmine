describe ("the todo page : task list", function() {

  beforeEach(function () {
    Meteor.call('fixtures.createTask', {
      text: 'This is task 1', createdAt: '2015-01-01'
    });
    Meteor.call('fixtures.createTask', {
      text: 'This is task 2', createdAt: '2015-02-01'
    });
    Meteor.call('fixtures.createTask', {
      text: 'This is task 3', createdAt: '2015-03-01'
    });  
  });
  afterEach(function() {
    Meteor.call('fixtures.destroyTasks');
  });

it ("should contain the current list of tasks sorted by creation date descending", function(done) {
    Meteor.setTimeout(function() {
      var tasks = TodosSpecHelper.retrieveTasksFromUI(); // use the helper

      expect(tasks.length).toEqual(3);
      expect(tasks[0]).toEqual('This is task 3');
      expect(tasks[1]).toEqual('This is task 2');
      expect(tasks[2]).toEqual('This is task 1');
      done();
    }, 400);
  });

});