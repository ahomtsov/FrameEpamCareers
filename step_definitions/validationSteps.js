const {Then, setDefaultTimeout} = require('@cucumber/cucumber');
const {by, element, browser, ExpectedConditions} = require("protractor");
const chai = require('chai');
const filterComponent = require('../components/FilterComponent.js');
const careersPage = require('../pages/CareersPage.js');
const jobPage = require('../pages/JobPage.js');
const query = require('../support/query.js');
const state = require('../support/state.js');
const memory = require('../support/memory.js');
const baseElements = require('../helpers/elements/BaseElements.js');
const waiters = require('../helpers/waiters.js');

setDefaultTimeout(15000);
const filterComponentFieldName = 'filter';

Then('I should be on the {string} page', async function(stateName) {
    state.setState(stateName);
    chai.expect(await state.getState().isLoaded()).to.be.true;
})

Then('the title of a new tab should contain {string}', async function(expectedPartOfTitle) {
    let actualTitle = await state.getState().getTitle();
    chai.expect(actualTitle.includes(expectedPartOfTitle)).to.be.true;
});

Then('the URL of a new tab should contain {string}', async function(expectedPartOfUrl) {
    let actualUrl = await state.getState().getUrl();
    chai.expect(actualUrl.includes(expectedPartOfUrl)).to.be.true;
})

Then('the title should be {string}', async function(title) {
    chai.assert.equal(await state.getState().getTitle(), title);
});

Then('the {string} equals the remembered one', async function(value) {
    let actual = '';
    switch (value) {
        case 'name of the job opening':
            actual = await jobPage.getNameOfJobOpening();
            break;
        case 'title of the new page':
            actual = await jobPage.getTitleOfNewPage();
            break;
        case 'filter result heading':
            actual = await careersPage.filter['filter result heading'].getText();
            break;
    }
    chai.assert.equal(actual, memory.getBuffer());
})

Then('each {string} of the first {string} shown items should contain {string} in any register', async function(parameter, amountOfItems, value) {
    let arrayOfParametersOfJobs = await query.getElement(filterComponentFieldName).getArrayOfParametersOfJobsInLowerCase(parameter, amountOfItems);
    arrayOfParametersOfJobs.forEach(function (element) {
        switch (parameter) {
            case 'name':
                chai.expect(element.includes(value.toString().toLowerCase())).to.be.true;
                break;
            case 'location':
                let arrayOfCityAndCountry = value.toString().toLowerCase().split(', ');
                chai.expect(element.includes(arrayOfCityAndCountry[0]) || element.includes(arrayOfCityAndCountry[1])).to.be.true;
                break;
        }
    })
});

Then('the first {string} shown items should contain {string} icon', async function(amountOfItems, icon) {
    let twoDimensionalArrayOfIconsOfJobs = await query.getElement(filterComponentFieldName).getTwoDimensionalArrayOfIconsOfJobs(amountOfItems);
    twoDimensionalArrayOfIconsOfJobs.forEach(function (element) {
        chai.expect(query.getElement(filterComponentFieldName).isIconPresented(element, icon.toString())).to.be.true;
    })
})

Then('error message is not displayed', async function() {
    chai.expect(await query.getElement(filterComponentFieldName).isErrorMessageDisplayed()).to.be.false;
})

Then('error message is displayed', async function() {
    chai.expect(await query.getElement(filterComponentFieldName).isErrorMessageDisplayed()).to.be.true;
})