const base = require('@playwright/test');
const ToDoPage = require('../../pages/to_do/to_do_page');

base.test = base.test.extend({
  // Base fixtures
  envConfig: async ({ page }, use) => {
    if (!process.env.ENVIRONMENT) process.env.ENVIRONMENT = 'default';
    await use(require(`../../configs/${process.env.ENVIRONMENT}`));
  },

  // Page object fixtures
  toDoPage: async ({ page }, use) => {
    await use(new ToDoPage(page));
  },
});

module.exports = base;
