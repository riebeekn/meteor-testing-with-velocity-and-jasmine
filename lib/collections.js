Tasks = new Mongo.Collection("tasks");

Meteor.methods({
  setPrivate: function (taskId, setToPrivate) {
    var task = Tasks.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.update(taskId, { $set: { private: setToPrivate } });
  },
  addTask: function (text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.insert({
      text: text,
      createdAt: new Date(),
      completed: false,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      private: false
    });
  },
  deleteTask: function (taskId) {
    var task = Tasks.findOne(taskId);

    // If the task is private, make sure only the owner can delete it
    if (task.private && task.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.remove(taskId);
  },
  setCompleted: function (taskId, setCompleted) {
    var task = Tasks.findOne(taskId);

    // If the task is private, make sure only the owner can check it off
    if (task.private && task.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    
    Tasks.update(taskId, { $set: { completed: setCompleted} });
  }
});