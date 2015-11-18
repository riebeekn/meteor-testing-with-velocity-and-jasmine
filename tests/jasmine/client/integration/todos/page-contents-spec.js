describe ("the todo page : page contents", function() {
  
  it ("should include a page title of 'Todo List'", function() {
    expect($('title').text()).toEqual('Todo List');
  });

  it ("should include a page heading of 'Todo List' appended " +
      "with the uncompleted task count", function(done) {
    Meteor.setTimeout(function() {
      expect($('h1').text()).toEqual('Todo List (0)');
      done();
    }, 400);
  });

  it ("should include an unordered list for displaying the tasks", function() {
    expect($('ul').length).toEqual(1);
  });

	it ("should include a field for entering a new task " 
	    + "with an appropriate placeholder", function() {
	  var input = $('.new-task input');
	  expect(input.length).toEqual(1);
	  expect(input.attr('placeholder')).toEqual('Type to add new tasks');    
	});

  it ("should include a checkbox for hiding completed tasks", function() {
    expect($('label.hide-completed').find('input:checkbox').length).toEqual(1);
  });
  
});