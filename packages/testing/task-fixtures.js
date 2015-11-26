var createTask = function(taskAttributes) {
  var task = _.merge({}, getDefaultTask(), taskAttributes);

  var taskId = Tasks.insert(task);

  return Tasks.findOne(taskId);
}

var destroyTasks = function() {
  Tasks.remove({});
}

var getDefaultTask = function() {
  var defaultUsername = '';
  var defaultOwnerId = '';

  // if a user is logged in, assign that user
  // as the owner of the task, otherwise we'll
  // default to 'Bob'
  if (Meteor.user()) {
    defaultUsername = Meteor.user().username;
    defaultOwnerId = Meteor.user()._id;
  } else {
    var user = Meteor.users.findOne({username: 'Bob'});
    defaultUsername = user.username;
    defaultOwnerId = user._id;
  }

  return {
    text: 'Task text',
    createdAt: new Date(),
    completed: false,
    username: defaultUsername,
    owner: defaultOwnerId,
    private: false
  }
};

Meteor.methods({
  'fixtures.createTask': createTask,
  'fixtures.destroyTasks': destroyTasks
});