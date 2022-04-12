const { expect } = require('@playwright/test');
const ToDoLocators = require('../../locators/to_do/to_do_locators');
const toDoConstants = require('../../constants/to_do/to_do_constants');

module.exports = class ToDoPage {
  constructor(page) {
    this.page = page;
    this.locators = new ToDoLocators(page);
  }

  /**
   * Verifies number of todos from local storage
   * @param {number} expected 
   * @returns 
   */
  async checkNumberOfTodosInLocalStorage(expected) {
    // eslint-disable-next-line no-undef
    return this.page.waitForFunction(e => JSON.parse(localStorage['react-todos']).length === e, expected);
  }

  /**
   * Verifies number of todos which are completed from local storage
   * @param {number} expected 
   * @returns 
   */
  async checkNumberOfCompletedTodosInLocalStorage(expected) {
    return this.page.waitForFunction(e => JSON.parse(localStorage['react-todos']).filter(i => i.completed).length === e, expected);
  }

  /**
   * Verifies todo with given title present in local storage
   * @param {string} title 
   * @returns 
   */
  async checkTodosInLocalStorage(title) {
    return this.page.waitForFunction(t => JSON.parse(localStorage['react-todos']).map(i => i.title).includes(t), title);
  }

  /**
   * Enters given item name in new todo field and press enter
   * @param {string} item 
   */
  async createAToDo(item) {
    await this.locators.newToDo.fill(item);
    await this.locators.newToDo.press('Enter');
  }

  /**
   * Creates todo with default set of todo items from constants
   */
  async createDefaultTodos() {
    for (const item of toDoConstants.TODO_ITEMS) {
      await this.createAToDo(item);
    }
  }

  /**
   * Vreifies given items are present on ui
   * @param {string[]]} items 
   */
  async verifyToDoListHasItems(items) {
    await expect(this.locators.viewLabel).toHaveText(items);
  }

  /**
   * Verifies that new todo input field is empty
   */
  async verifyToDoInputIsEmpty() {
    await expect(this.locators.newToDo).toBeEmpty();
  }

  /**
   * Verifies todo count text with given text
   * @param {string} expectedText 
   */
  async verifyToDoCountText(expectedText) {
    await expect(this.locators.toDoCount).toHaveText(expectedText);
    await expect(this.locators.toDoCount).toContainText('3');
    await expect(this.locators.toDoCount).toHaveText(/3/);
  }

  /**
   * Verifies that main is visible
   */
  async verifyMainIsVisible() {
    await expect(this.locators.main).toBeVisible();
  }

  /**
   * Verifies that footer is visible
   */
  async verifyFooterIsVisible() {
    await expect(this.locators.footer).toBeVisible();
  }

  /**
   * Clicks the toggle all checkbox
   */
  async checkToggleAll() {
    await this.locators.toggleAll.check();
  }

  /**
   * Unchecks toggle all checkbox
   */
  async uncheckToggleAll() {
    await this.locators.toggleAll.uncheck();
  }

  /**
   * Verifies toggle all checkbox is checked
   */
  async verifyToggleAllIsChecked() {
    await expect(this.locators.toggleAll).toBeChecked();
  }

  /**
   * Verifies that to do list has given class
   * @param {string[]} expectedClass 
   */
  async verifyToDoListClass(expectedClass) {
    await expect(this.locators.toDoList).toHaveClass(expectedClass);
  }

  /**
   * Clicks on first to do toggle checkbox
   */
  async checkFirstToDoToggle() {
    await this.locators.firstToDoToggle.check();
  }

  /**
   * Unchecks first to do toggle checkbox
   */
  async uncheckFirstToDoToggle() {
    await this.locators.firstToDoToggle.uncheck();
  }

  /**
   * Verifies first to do toggle checkbox is checked
   */
  async verifyFirstToDoToggleIsUnchecked() {
    await expect(this.locators.firstToDoToggle).not.toBeChecked();
  }

  /**
   * Verifies that first to do has given class or not based on toHave param
   * @param {string} expectedClass 
   * @param {boolean} toHave 
   */
  async verifyFirstToDoClass(expectedClass, toHave = true) {
    if (toHave) await expect(this.locators.firstToDo).toHaveClass(expectedClass);
    else await expect(this.locators.firstToDo).not.toHaveClass(expectedClass);
  }

  /**
   * Clicks on second to do toggle checkbox
   */
  async checkSecondToDoToggle() {
    await this.locators.secondToDoToggle.check();
  }

  /**
   * Verifies that second to do has given class or not based on toHave param
   * @param {string} expectedClass 
   * @param {boolean} toHave 
   */
  async verifySecondToDoClass(expectedClass, toHave = true) {
    if (toHave) await expect(this.locators.secondToDo).toHaveClass(expectedClass);
    else await expect(this.locators.secondToDo).not.toHaveClass(expectedClass);
  }

  /**
   * Double clicks on second to do
   */
  async doubleClickOnSecondToDo() {
    await this.locators.secondToDo.dblclick();
  }

  /**
   * Verifies second to do field value with expected value
   * @param {string} expectedValue 
   */
  async verifySecondToDoFieldValue(expectedValue) {
    await expect(this.locators.secondToDoField).toHaveValue(expectedValue);
  }

  /**
   * Set the second to do field value and clicks on enter
   * @param {string} value 
   */
  async addSecondToDoFieldValue(value) {
    await this.locators.secondToDoField.fill(value);
    await this.locators.secondToDoField.press('Enter');
  }
};