Template.body.onCreated(function() {
  Meteor.subscribe("tasks");
});

Template.body.helpers({
  tasks: function() {
    return Tasks.find();
  }
});