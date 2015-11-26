describe ("the todo page : update task", function() {

  describe ("private and public tasks", function() {

    beforeAll(function() {
      Package.testing.TestUser.login();
    });
    afterAll(function() {
      Package.testing.TestUser.logout();
    });

    describe ("public tasks", function() {
      
      beforeEach(function() {
        Meteor.call('fixtures.createTask', 
          { text: "This is a public task"});
      });
      afterEach(function() {
        Meteor.call('fixtures.destroyTasks');
      });

      it ("should update the task to private when public button is clicked", function(done) {
        Meteor.setTimeout(function() {
          // set the task to private
          $('.toggle-private').click();

          var taskInDb = Tasks.findOne({text: "This is a public task"});
          expect(taskInDb.private).toEqual(true);
          done();
        }, 400);
      });

      it ("should update the text of the button to 'private' when the public button is clicked", function(done) {
        Meteor.setTimeout(function() {
          $('.toggle-private').click();
        }, 400);
        Meteor.setTimeout(function() {
          expect($('.toggle-private').text().trim()).toEqual('Private');
          done();
        }, 800);
      });
    
    });

    describe ("private tasks", function() {

      beforeEach(function() {
        Meteor.call('fixtures.createTask', 
          { text: "This is a private task", private: true});
      });
      afterEach(function() {
        Meteor.call('fixtures.destroyTasks');
      });

      it ("should update the task to public when private button is clicked", function(done) {
        Meteor.setTimeout(function() {
          // set the task to private
          $('.toggle-private').click();

          var taskInDb = Tasks.findOne({text: "This is a private task"});
          expect(taskInDb.private).toEqual(false);
          done();
        }, 400);
      });

      it ("should update the text of the button to 'public' when the private button is clicked", function(done) {
        Meteor.setTimeout(function() {
          $('.toggle-private').click();
        }, 400);
        Meteor.setTimeout(function() {
          expect($('.toggle-private').text().trim()).toEqual('Public');
          done();
        }, 800);
      });
      
    });

  });
  
  describe ("completing a task", function() {
    beforeEach(function() {
      Meteor.call('fixtures.createTask');
    });
    afterEach(function() {
      Meteor.call('fixtures.destroyTasks');
    });
      
    it ("should set the 'completed' field to true", function(done) {
      toggleAndCheckTaskStatus(true, done);
    });

    it ("should show a strike-through for the completed tasks", function(done) {
      toggleStatusAndCheckStrikeThru(true, done);
    });
  });

  describe ("re-activating a task", function() {
    beforeEach(function () {
      Meteor.call('fixtures.createTask', {completed: true});
    });
    afterEach(function() {
      Meteor.call('fixtures.destroyTasks');
    });
      
    it ("should set the 'completed' field to false", function(done) {
      toggleAndCheckTaskStatus(false, done);
    });

    it ("should remove the strike-through for the re-activated tasks", function(done) {
      toggleStatusAndCheckStrikeThru(false, done);
    });

  });

  var toggleAndCheckTaskStatus = function(completeTask, done) {
    Meteor.setTimeout(function() {
      // activate the checkbox
      $("li").find("input:checkbox").click();
      
      // find the associated record in the DB
      var tasks = Tasks.find().fetch();
      expect(tasks[0].completed).toEqual(completeTask);

      // verify the status of the UI checkbox
      expect($("li").find("input:checkbox").is(':checked')).toEqual(completeTask);
      done();
    }, 400);
  }

  var toggleStatusAndCheckStrikeThru = function(completeTask, done) {
    Meteor.setTimeout(function() {
      $("li").find("input:checkbox").click();
    }, 400);

    Meteor.setTimeout(function() {
      expect($("li").hasClass('checked')).toBe(completeTask);
      done();
    }, 800);
  }

});