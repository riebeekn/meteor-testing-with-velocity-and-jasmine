var createTask = function(taskAttributes) {
  var task = _.merge({}, getDefaultTask(), taskAttributes);

  var taskId = Tasks.insert(task);

  return Tasks.findOne(taskId);
}

var destroyTasks = function() {
  Tasks.remove({});
}

var getDefaultTask = function() {
  return {
    text: 'Task text',
    createdAt: new Date()
  }
};

Meteor.methods({
  'fixtures.createTask': createTask,
  'fixtures.destroyTasks': destroyTasks
});