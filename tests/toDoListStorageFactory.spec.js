describe('Factory: ToDoListStorage', function() {
  beforeEach(module('ToDoList'));

  var store;

  var item1 = {
    title: 'cleaning',
    completed: false
  };
  var item2 = {
    title: 'mopping',
    completed: true
  };
  var item3 = {
    title: 'washing',
    completed: true
  };

  beforeEach(inject(function(ToDoListStorage) {
    store = ToDoListStorage;
  }));

  describe('#insert', function() {
    it('stores the item in the list', function() {
      store.insert(item1)
        .then(function(response) {
          expect(response.last).toEqual(item1);
        });
    });
  });

  describe('#put', function() {
    beforeEach(function() {
      store.insert(item1);
    });
    it('replaces a particular item of the list by index', function() {
      store.put(item2, 0)
        .then(function(response) {
          expect(response.last).toEqual(item2);
        });
    });
  });

  describe('#delete', function() {
    beforeEach(function() {
      store.insert(item1);
    });
    it('deletes a particular item of the list', function() {
      store.delete(item1)
        .then(function(response) {
          expect(response.count).toEqual(0);
        });
    });
  });

  describe('#clearCompleted', function() {
    beforeEach(function() {
      store.insert(item1);
      store.insert(item2);
      store.insert(item3);
    });
    it('deletes all the completed items of the list', function() {
      store.delete(item1)
        .then(function(response) {
          expect(response).toEqual(item1);
        });
    });
  });
});
