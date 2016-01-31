toDoList.controller('ToDoListController', ['ToDoListStorage', function(ToDoListStorage) {
  var self = this;
  self.newItem = undefined;
  self.items = ToDoListStorage.items;
  self.filteredItems = self.items;

  self.addItem = function() {
    var newItem = {
				title: self.newItem.trim(),
				completed: false
			};
			if (!newItem.title) { return; }
			ToDoListStorage.insert(newItem)
				.then(function success() {
					self.newItem = undefined;
				});
  };

  self.toggleCompleted = function (item, completed) {
    if (angular.isDefined(completed)) { item.completed = completed; }
		ToDoListStorage.put(item, self.items.indexOf(item))
	};

  self.removeItem = function (item) {
		ToDoListStorage.delete(item);
	};

  self.filter = function(type) {
    self.filteredItems = self.items.filter(function(item) {
      if (type === 'active')    { return (!item.completed); }
      if (type === 'completed') { return (item.completed); }
      return item;
     });
  }

  self.remainingCount = function() {
    return self.items.filter(function(item) {
      return (!item.completed);
    }).length;
  };

  self.clearCompletedItems = function () {
		ToDoListStorage.clearCompleted();
	};
}]);
