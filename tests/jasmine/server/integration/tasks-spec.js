describe ("Tasks", function() {

  describe ("addTask", function() {
    it ("should throw an exception when adding a task if the user " 
        + "is not logged in", function() {
      Meteor.call('addTask', 'some task', function(err) {
        expect(err).not.toBe(undefined);
        expect(err.error).toEqual('not-authorized');
      });
    });
  });

  describe ("private tasks : not owned by the current user", function() {

    var taskId = '';
    beforeEach(function() {
      Meteor.call('fixtures.createTask', { 
        text: "This is a private task", 
        private: true,
        owner: 'someUserId'
      }, function(error, result) {
        taskId = result._id;
      });
    });
    afterEach(function() {
      Meteor.call('fixtures.destroyTasks');
    });

    describe("setCompleted", function() {
      it ("should not be able to be completed", function() {
        spyOn(Meteor, 'userId').and.returnValue('someOtherUserId');

        Meteor.call('setCompleted', taskId, true, function(err) {
          expect(err).not.toBe(undefined);
          expect(err.error).toEqual('not-authorized');
        });
      });
    });

    describe("deleteTask", function() {
      it ("should not be able to be deleted", function() {
        spyOn(Meteor, 'userId').and.returnValue('someOtherUserId');

        Meteor.call('deleteTask', taskId, function(err) {
          expect(err).not.toBe(undefined);
          expect(err.error).toEqual('not-authorized');
        });
      });
    });

    describe("setPrivate", function() {
      it ("should not be able to be marked as public", function() {
        spyOn(Meteor, 'userId').and.returnValue('someOtherUserId');

        Meteor.call('setPrivate', taskId, false, function(err) {
          expect(err).not.toBe(undefined);
          expect(err.error).toEqual('not-authorized');
        });
      });
    });
  });
  
});