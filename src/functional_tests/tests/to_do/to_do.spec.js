const { test, expect } = require('../../helpers/common/base_test');
const toDoConstants = require('../../constants/to_do/to_do_constants');
const TestDataHelper = require('../../helpers/common/test_data_helper');

test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ envConfig, page }) => {
  await page.goto(envConfig.url);
});

test.describe('New Todo', () => {
  test('should allow me to add todo items', async ({ toDoPage }) => {
    // Create 1st todo.
    await toDoPage.createAToDo(toDoConstants.TODO_ITEMS[0]);

    // Make sure the list only has one todo item.
    await toDoPage.verifyToDoListHasItems([toDoConstants.TODO_ITEMS[0]]);

    // Create 2nd todo.
    await toDoPage.createAToDo(toDoConstants.TODO_ITEMS[1]);

    // Make sure the list now has two todo items.
    await toDoPage.verifyToDoListHasItems([
      toDoConstants.TODO_ITEMS[0],
      toDoConstants.TODO_ITEMS[1]
    ]);

    await toDoPage.checkNumberOfTodosInLocalStorage(2);
  });

  test('should clear text input field when an item is added', async ({ toDoPage }) => {
    // Create one todo item.
    await toDoPage.createAToDo(toDoConstants.TODO_ITEMS[0]);

    // Check that input is empty.
    await toDoPage.verifyToDoInputIsEmpty();
    await toDoPage.checkNumberOfTodosInLocalStorage(1);
  });

  test('should append new items to the bottom of the list', async ({ toDoPage }) => {
    // Create 3 items.
    await toDoPage.createDefaultTodos();

    // Check test using different methods.
    await toDoPage.verifyToDoCountText('3 items left');

    // Check all items in one call.
    await toDoPage.verifyToDoListHasItems(toDoConstants.TODO_ITEMS);
    await toDoPage.checkNumberOfTodosInLocalStorage(3);
  });

  test('should show #main and #footer when items added', async ({ toDoPage }) => {
    await toDoPage.createAToDo(toDoConstants.TODO_ITEMS[0]);

    await toDoPage.verifyMainIsVisible();
    await toDoPage.verifyFooterIsVisible();
    await toDoPage.checkNumberOfTodosInLocalStorage(1);
  });
});

test.describe('Mark all as completed', () => {
  test.beforeEach(async ({ toDoPage }) => {
    await toDoPage.createDefaultTodos();
    await toDoPage.checkNumberOfTodosInLocalStorage(3);
  });

  test.afterEach(async ({ toDoPage }) => {
    await toDoPage.checkNumberOfTodosInLocalStorage(3);
  });

  test('should allow me to mark all items as completed', async ({ toDoPage }) => {
    // Complete all todos.
    await toDoPage.checkToggleAll();

    // Ensure all todos have 'completed' class.
    await toDoPage.verifyToDoListClass(['completed', 'completed', 'completed']);
    await toDoPage.checkNumberOfCompletedTodosInLocalStorage(3);
  });

  test('should allow me to clear the complete state of all items', async ({ toDoPage }) => {
    // Check and then immediately uncheck.
    await toDoPage.checkToggleAll();
    await toDoPage.uncheckToggleAll();

    // Should be no completed classes.
    await toDoPage.verifyToDoListClass(['', '', '']);
  });

  test('complete all checkbox should update state when items are completed / cleared', async ({ toDoPage }) => {
    await toDoPage.checkToggleAll();
    await toDoPage.verifyToggleAllIsChecked();
    await toDoPage.checkNumberOfCompletedTodosInLocalStorage(3);

    // Uncheck first todo.
    await toDoPage.uncheckFirstToDoToggle();

    // Reuse toggleAll locator and make sure its not checked.
    await toDoPage.verifyFirstToDoToggleIsUnchecked();

    await toDoPage.checkFirstToDoToggle();
    await toDoPage.checkNumberOfCompletedTodosInLocalStorage(3);

    // Assert the toggle all is checked again.
    await toDoPage.verifyToggleAllIsChecked();
  });
});

test.describe('Item', () => {

  test('should allow me to mark items as complete', async ({ toDoPage }) => {
    // Create two items.
    for (const item of toDoConstants.TODO_ITEMS.slice(0, 2)) {
      await toDoPage.createAToDo(item);
    }

    // Check first item.
    await toDoPage.checkFirstToDoToggle();
    await toDoPage.verifyFirstToDoClass('completed');

    // Check second item.
    await toDoPage.verifySecondToDoClass('completed', false);
    await toDoPage.checkSecondToDoToggle();

    // Assert completed class.
    await toDoPage.verifyFirstToDoClass('completed');
    await toDoPage.verifySecondToDoClass('completed');
  });

  test('should allow me to un-mark items as complete', async ({ toDoPage }) => {
    // Create two items.
    for (const item of toDoConstants.TODO_ITEMS.slice(0, 2)) {
      await toDoPage.createAToDo(item);
    }

    await toDoPage.checkFirstToDoToggle();
    await toDoPage.verifyFirstToDoClass('completed');
    await toDoPage.verifySecondToDoClass('completed', false);
    await toDoPage.checkNumberOfCompletedTodosInLocalStorage(1);

    await toDoPage.uncheckFirstToDoToggle();
    await toDoPage.verifyFirstToDoClass('completed', false);
    await toDoPage.verifySecondToDoClass('completed', false);
    await toDoPage.checkNumberOfCompletedTodosInLocalStorage(0);
  });

  test('should allow me to edit an item', async ({ toDoPage }) => {
    await toDoPage.createDefaultTodos();

    await toDoPage.doubleClickOnSecondToDo();
    await toDoPage.verifySecondToDoFieldValue(toDoConstants.TODO_ITEMS[1]);
    await toDoPage.addSecondToDoFieldValue('buy some sausages');

    // Explicitly assert the new text value.
    await toDoPage.verifyToDoListHasItems([
      toDoConstants.TODO_ITEMS[0],
      'buy some sausages',
      toDoConstants.TODO_ITEMS[2]
    ]);
    await toDoPage.checkTodosInLocalStorage('buy some sausages');
  });
});

// Data driven test example
test.describe('Test Data demo', () => {
  const columns = ['Username', 'Password'];
  for (const column of columns) {
    test(`should load excel test data and prints the given key-value for ${column}`, () => {
      const data = new TestDataHelper('src/resources/data/LoginPage.xlsx', 'Login Page', 'TC1');
      expect(data.get(column)).toBe('abcd');
    });
  }
});
