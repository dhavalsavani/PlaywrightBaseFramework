module.exports = class ToDoLocators {
  constructor(page) {
    this.newToDo = page.locator('.new-todo');
    this.viewLabel = page.locator('.view label');
    this.toDoCount = page.locator('.todo-count');
    this.main = page.locator('.main');
    this.footer = page.locator('.footer');
    this.toggleAll = page.locator('.toggle-all');
    this.toDoList = page.locator('.todo-list li');
    this.firstToDo = this.toDoList.nth(0);
    this.firstToDoToggle = this.firstToDo.locator('.toggle');
    this.secondToDo = this.toDoList.nth(1);
    this.secondToDoToggle = this.secondToDo.locator('.toggle');
    this.secondToDoField = this.secondToDo.locator('.edit');
  }
};