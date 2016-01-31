toDoList.factory('ToDoListStorage', ['$q', function($q) {

  var store = {
    items: [],

    clearCompleted: function () {
      var deferred = $q.defer();
      var incompleteItems = store.items.filter(function (item) {
        return !item.completed;
      });
      angular.copy(incompleteItems, store.items);
      deferred.resolve(store.items);
      return deferred.promise;
    },

    delete: function (item) {
      var deferred = $q.defer();
      store.items.splice(store.items.indexOf(item), 1);
      deferred.resolve(store.items);
      return deferred.promise;
    },

    insert: function (item) {
      var deferred = $q.defer();
      store.items.push(item);
      deferred.resolve(store.items);
      return deferred.promise;
    },

    put: function (item, index) {
      var deferred = $q.defer();
      store.items[index] = item;
      deferred.resolve(store.items);
      return deferred.promise;
    }
  };

  return store;
}]);
