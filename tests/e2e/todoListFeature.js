describe('Todo List', function() {

  var newItemBox = element(by.model('ctrl.newItem'));

  beforeEach(function() {
    browser.get('http://localhost:8080');
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Todo List');
  });

  describe('adding a new item', function() {
    beforeEach(function() {
      newItemBox.sendKeys('cleaning');
      newItemBox.sendKeys(protractor.Key.ENTER);
    });
    it('display the item in the list', function() {
      expect(element(by.binding('item.title')).getText()).toEqual('cleaning');
    });
    it('display the item as not completed', function() {
      expect(element(by.model('item.completed')).isSelected()).toBe(false);
    });
    it('increment the remaining items counter', function() {
      expect(element(by.binding('ctrl.remainingCount()')).getText())
        .toEqual('1');
    });
  });

  describe('marking an item as completed', function() {
    beforeEach(function() {
      newItemBox.sendKeys('cleaning');
      newItemBox.sendKeys(protractor.Key.ENTER);
      element(by.model('item.completed')).click();
    });
    it('display the item as completed', function() {
      expect(element(by.model('item.completed')).isSelected()).toBe(true);
    });
    it('decrement the remaining items counter', function() {
      expect(element(by.binding('ctrl.remainingCount()')).getText())
        .toEqual('0');
    });
  });

  describe('removing an item', function() {
    it('no longer display the item in the list', function() {
      newItemBox.sendKeys('cleaning');
      newItemBox.sendKeys(protractor.Key.ENTER);
      element(by.css('a.remove')).click();
      expect(element(by.binding('item.title')).isPresent()).toBe(false);
    });
  });

  describe('filtering items', function() {
    var filteredItems = element.all(by.repeater('item in ctrl.filteredItems'));
    beforeEach(function() {
      newItemBox.sendKeys('cleaning');
      newItemBox.sendKeys(protractor.Key.ENTER);
      element(by.model('item.completed')).click();
      newItemBox.sendKeys('mopping');
      newItemBox.sendKeys(protractor.Key.ENTER);
    });
    it('display all the items when the "all" filter is clicked', function() {
      element(by.css('#all')).click();
      expect(filteredItems.count()).toEqual(2);
    });
    it('display only completed items when the "completed" filter is clicked', function() {
      element(by.css('#completed')).click();
      expect(filteredItems.count()).toEqual(1);
      expect(element(by.binding('item.title')).getText()).toEqual('cleaning');
    });
    it('display only not completed items when the "active" filter is clicked', function() {
      element(by.css('#active')).click();
      expect(filteredItems.count()).toEqual(1);
      expect(element(by.binding('item.title')).getText()).toEqual('mopping');
    });
  });

  describe('clearing completed items', function() {
    it('no longer display not completed items in the list', function() {
      newItemBox.sendKeys('cleaning');
      newItemBox.sendKeys(protractor.Key.ENTER);
      element(by.model('item.completed')).click();
      newItemBox.sendKeys('mopping');
      newItemBox.sendKeys(protractor.Key.ENTER);
      element(by.css('a.clear-all')).click();
      expect(element(by.binding('item.title')).getText()).toEqual('mopping');
    });
  });
});
