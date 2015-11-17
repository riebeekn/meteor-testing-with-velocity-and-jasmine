TodosSpecHelper = {};

TodosSpecHelper.retrieveTasksFromUI = function() {
  var tasks = $("li").map(function() { 
    return $(this).text();
  }).get();

  return tasks;
}