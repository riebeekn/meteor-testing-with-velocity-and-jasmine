describe ("the todo page : task list", function() {

  beforeEach(function () {
    Meteor.call('fixtures.createTask', {text: 'This is task 1'});
    Meteor.call('fixtures.createTask', {text: 'This is task 2'});
    Meteor.call('fixtures.createTask', {text: 'This is task 3'});
  });
  afterEach(function() {
    Meteor.call('fixtures.destroyTasks');
  });

  it ("should contain the current list of tasks", function(done) {
    Meteor.setTimeout(function() {
      var tasks = $("li").map(function() { 
        return $(this).text();
      }).get();

      expect(tasks.length).toEqual(3);
      expect(tasks[0]).toEqual('This is task 1');
      expect(tasks[1]).toEqual('This is task 2');
      expect(tasks[2]).toEqual('This is task 3');
      done();
    }, 400);
  });

});