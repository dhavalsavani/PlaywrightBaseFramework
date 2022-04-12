# Base framework based on Playwright and NodeJS

1. [Functional Tests](src/functional_tests/) - source folder for all the coding files
   1. [Constants](src/functional_tests/constants/) - All the test related constant files
   2. [Helpers](src/functional_tests//helpers/) - All the helper/utility modules/classes like test data helper or ecncyption helper etc.
   3. [Locators](src/functional_tests/locators/) - All the locator file like login locators or home locators etc.
   4. [Pages](src/functional_tests//pages/) - All the page object modules/classes like login page or home page etc.
   5. [tests](src/functional_tests//tests/) - All the test modules/classes
   6. [Test Base](src/functional_tests/helpers/common/base_test.js) - Base for all test files. This should be imported for getting test and expect object rather than @playwright/test in tests. This class also contains all page object fixtures for page object initialization which can be directly used as param in tests.
2. [Reports](src/reports/) - All the reports will be generate in this directory
3. [Resources](src/resources/) - All the resources related to suite will be in this directory
   1. [Test Data](src/resources/data/) - All the test data files will be in this directory
4. [Playwright configuration](playwright.config.js) - configuration file for playwright

## Local Setup

1. Install `nvm`
   1. Mac - `brew install nvm`
   2. Windows - Follow instruction given [here](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows)
2. Install 16.x.x LTS version - `nvm install --lts` or `nvm install 16.x.x`. check the latest lts version from node website
3. Install dependencies - `cd PlaywrightBaseFramework && npm install`
4. Install playwright browsers(optional) - `npx playwright install`
5. Run tests - `npm run tests`

## Secrets Management

For encrypting/decrypting any secret text/file(s) run below command with text or file path or directory path(for encrypting multiple files)

1. For encrypting/decrypting single file - `cd PlaywrightBaseFramework; npx run-func src/functional_tests/helpers/common/encryption_helper.js encryptFile '<encryption password>' '<file_path>'`.<br>
   For Example: <br>
   `cd PlaywrightBaseFramework; npx run-func src/functional_tests/helpers/common/encryption_helper.js encryptFile '<encryption password>' './configs/default.js'`

   1. for decryption just replace function `encryptFile` with `decryptFile`<br><br>

2. For encrypting/decrypting multiple files - `cd PlaywrightBaseFramework; npx run-func src/functional_tests/helpers/common/encryption_helper.js encryptFiles '<encryption password>' '<directory_path>'`.<br>
   For Example: <br>
   `cd PlaywrightBaseFramework; npx run-func src/functional_tests/helpers/common/encryption_helper.js encryptFiles '<encryption password>' './configs'`

   1. for decryption just replace function `encryptFiles` with `decryptFiles`<br><br>

3. For encrypting/decrypting single text - `cd PlaywrightBaseFramework; npx run-func src/functional_tests/helpers/common/encryption_helper.js encryptText 'abcd' '<encryption password>'`.

   1. for decryption just replace function `encryptText` with `decryptText`
