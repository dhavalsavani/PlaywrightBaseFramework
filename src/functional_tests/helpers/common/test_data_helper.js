const XLSX = require('xlsx');
const { expect } = require('@playwright/test');

module.exports = class TestDataHelper {
  constructor(filePath, sheetName = undefined, testCaseId = undefined) {
    this.filePath = filePath;
    this.#loadExcel(filePath)
    if (sheetName && testCaseId) this.loadData(sheetName, testCaseId);
  }

  /**
   * Loads the excel file from given file path
   * @param {string} file 
   */
  #loadExcel(file) {
    this.wb = XLSX.readFile(file);
  }

  /**
   * Loads given test case id row data from given sheet.<br>
   * It Checks if the given test id present in the sheet and<br>
   * there are no duplicates test case id in the sheet
   * @param {string} sheetName 
   * @param {string} testCaseId 
   */
  loadData(sheetName, testCaseId) {
    /* generate array of row objects */
    this.data = XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName]);
    const filteredData = this.data.filter(row => row['Test Case Id'] === testCaseId);
    expect(filteredData.length, `${testCaseId} not found in ${sheetName} sheet at file ${this.filePath}`).toBeGreaterThan(0);
    expect(filteredData.length, `Multiple ${testCaseId} found in ${sheetName} sheet at file ${this.filePath}`).toBe(1);
    this.testData = filteredData[0];
  }

  /**
   * Gets the value of the key present in data file which represents a column value
   * @param {string} key 
   * @returns the value of the key
   */
  get(key) {
    return this.testData[key];
  }
}
