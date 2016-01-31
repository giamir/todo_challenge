describe('ToDoListController', function() {
  var ctrl;
  var scope;

  beforeEach(module('ToDoList'));

  beforeEach(inject(function($controller, $rootScope) {
    ctrl = $controller('ToDoListController');
    scope = $rootScope;
  }));

  it('initializes with an empty new item', function() {
    expect(ctrl.newItem).toBeUndefined();
  });
  it('initializes with filtered items equal to items', function() {
    expect(ctrl.filteredItems).toEqual(ctrl.items);
  });

  describe('#addItem', function() {
    it('saves the item with a title', function() {
      ctrl.newItem = 'cleaning';
      ctrl.addItem();
      scope.$digest();
      expect(ctrl.items[0].title)
        .toEqual('cleaning');
    });
    it('saves the item as not completed', function() {
      ctrl.newItem = 'cleaning';
      ctrl.addItem();
      scope.$digest();
      expect(ctrl.items[0].completed)
        .toBe(false);
    });
  });

  describe('#toggleCompleted', function() {
    it('updates the item as completed', function() {
      ctrl.newItem = 'cleaning';
      ctrl.addItem();
      ctrl.toggleCompleted(ctrl.items[0], true)
      scope.$digest();
      expect(ctrl.items[0].completed)
        .toBe(true);
    });
  });

  describe('#removeItem', function() {
    it('deletes the item', function() {
      ctrl.newItem = 'cleaning';
      ctrl.addItem();
      ctrl.removeItem(ctrl.items[0]);
      scope.$digest();
      expect(ctrl.items)
        .not.toContain({'title': 'cleaning', 'completed': true});
    });
  });

  describe('#filter', function() {
    beforeEach(function() {
      ctrl.newItem = 'cleaning';
      ctrl.addItem();
      ctrl.newItem = 'mopping';
      ctrl.addItem();
      ctrl.toggleCompleted(ctrl.items[0], true);
    });
    describe('called with no arguments', function() {
      it('sets filtered items equal to all items', function() {
        ctrl.filter();
        scope.$digest();
        expect(ctrl.filteredItems).toEqual(ctrl.items);
      });
    });
    describe('called with active', function() {
      it('sets filtered items equal to items not completed yet', function() {
        ctrl.filter('active');
        scope.$digest();
        expect(ctrl.filteredItems)
          .toContain({'title': 'mopping', 'completed': false});
        expect(ctrl.filteredItems)
          .not.toContain({'title': 'cleaning', 'completed': true});
      });
    });
    describe('called with completed', function() {
      it('sets filtered items equal to items already completed', function() {
        ctrl.filter('completed');
        scope.$digest();
        expect(ctrl.filteredItems)
          .toContain({'title': 'cleaning', 'completed': true});
        expect(ctrl.filteredItems)
          .not.toContain({'title': 'mopping', 'completed': false});
      });
    });
  });

  describe('#remainingCount', function() {
    it('returns the number of not completed items', function() {
      expect(ctrl.remainingCount()).toEqual(0);
      ctrl.newItem = 'cleaning';
      ctrl.addItem();
      scope.$digest();
      expect(ctrl.remainingCount()).toEqual(1);
    });
  });

  describe('#clearCompletedItems', function() {
    beforeEach(function() {
      ctrl.newItem = 'cleaning';
      ctrl.addItem();
      ctrl.newItem = 'mopping';
      ctrl.addItem();
    });
    it('does not delete not completed items', function() {
      ctrl.clearCompletedItems();
      scope.$digest();
      expect(ctrl.items.length).toEqual(2);
    });
    it('deletes all the completed items', function() {
      ctrl.toggleCompleted(ctrl.items[0], true);
      ctrl.clearCompletedItems();
      scope.$digest();
      expect(ctrl.items.length).toEqual(1);
    });
  });
});
