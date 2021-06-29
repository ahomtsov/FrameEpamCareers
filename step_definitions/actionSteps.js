const {When, setDefaultTimeout} = require('@cucumber/cucumber');
const {by, element, browser, ExpectedConditions} = require("protractor");
const filterComponent = require('../components/FilterComponent.js');
const careersPage = require('../pages/CareersPage.js');
const jobPage = require('../pages/JobPage.js');
const BasePageClass = require('../pages/BasePage.js');
const basePage = new BasePageClass();
const query = require('../support/query.js');
const state = require('../support/state.js');
const memory = require('../support/memory.js');
const baseElements = require('../helpers/elements/BaseElements.js');
const waiters = require('../helpers/waiters.js');

setDefaultTimeout(15000);
const filterComponentFieldName = 'filter';

When('I open the {string} page', async function (pageName) {
    state.setState(pageName);
    await state.getState().openPage();
});

When('I click the button number {string} from {string} buttons', async function(btnIndex, btnNames) {
    await baseElements.click(query.getElement(btnNames + 's').get(Number.parseInt(btnIndex) - 1));
});

When('I go to the opened {string} tab', async function (tabName) {
    let windowHandles = await browser.getAllWindowHandles();
    await browser.switchTo().window(windowHandles[1]);
});

When('I click the {string} button from the {string} section', async function(btnName, sectionName) {
    await baseElements.click(query.getElement(btnName + ' - ' + sectionName));
});

When('I click the Find button', async function () {
    await careersPage.filter.clickFindButton();
});

When('I click the first appeared job opening', async function () {
    await careersPage.filter.clickFirstAppearedJobOpening();
});

When('I open new page by clicking the {string} button', async function(buttonName) {
    await baseElements.click(query.getElement(buttonName));
    await waiters.waitUntilIsVisible(query.getElement('expected element after clicking the ' + buttonName + ' button'));
});

When('I remember the {string}', async function(fieldName) {
    let value = '';
    switch (fieldName) {
        case 'name of the first related job opening':
            value = await jobPage.getNameOfFirstRelatedJobOpening();
            break;
        case 'name of the first person from A day in the life section':
            value = await jobPage.getNameOfFirstPersonDayInLifeSection();
            break;
        case 'filter result heading':
        case 'name of the first appeared job opening':
            value = await careersPage.filter[fieldName].getText();
            break;
    }
    memory.setBuffer(value);
});

When('I type {string} in the Keyword field', async function(string) {
    await baseElements.sendKeys(query.getElement(filterComponentFieldName).keywordField, string);
});

When('I set the {string} country and {string} city for the Location field', async function(country, city) {
    await query.getElement(filterComponentFieldName).setLocationInLocationField(country, city);
});

When('I mark the {string} checkbox', async function (checkboxName) {
    await baseElements.click(query.getElement(filterComponentFieldName)[checkboxName + ' checkbox']);
});

When('I set the All Locations value for the Location field', async function () {
    await baseElements.click(query.getElement(filterComponentFieldName).locationField);
    await baseElements.click(query.getElement(filterComponentFieldName).allLocationsValueInLocationField);
});

When('I refresh the page', async function () {
    await query.getElement(filterComponentFieldName).refreshPage();
});

When('I return back to the filtered page', async function () {
    await browser.navigate().back();
    state.setState('EPAM Careers');
    await waiters.waitUntilIsVisible(query.getElement(filterComponentFieldName).firstAppearedJobOpening);
});

When('I open new page with current URL', async function () {
    await basePage.go(await basePage.getUrl());
    await waiters.waitUntilIsVisible(careersPage.filter['filter result heading']);
});