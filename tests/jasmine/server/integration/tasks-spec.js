describe ("Tasks : addTask", function() {

  it ("should throw an exception when adding a task if the user " 
      + "is not logged in", function() {
    Meteor.call('addTask', 'some task', function(err) {
      expect(err).not.toBe(undefined);
      expect(err.error).toEqual('not-authorized');
    });
  });
  
});