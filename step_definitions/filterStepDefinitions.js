const {When, Then, Given, AfterStep, Status, BeforeAll, setDefaultTimeout} = require('@cucumber/cucumber');
const {by, element, browser, ExpectedConditions} = require("protractor");
const chai = require('chai');
const filterComponent = require('../components/FilterComponent.js');

setDefaultTimeout(15000);

When('I type {string} in the Keyword field', async function(string) {
    await filterComponent.typeStringInKeywordField(string);
});

When('I set the {string} country and {string} city for the Location field', async function(country, city) {
    await filterComponent.setLocationInLocationField(country, city);
});

When('I mark the {string} checkbox', async function (checkbox) {
    await filterComponent.markCheckbox(checkbox);
});

When('I set the All Locations value for the Location field', async function () {
    await filterComponent.setAllLocationsValueInLocationField();
});

When('I click the Find button', async function () {
    await filterComponent.clickFindButton();
});

When('I refresh the page', async function () {
    await filterComponent.refreshPage();
});

When('I remember filter result heading', async function () {
    await filterComponent.setFilterResultHeading();
});

When('I remember name of the first appeared job opening', async function () {
    await filterComponent.setNameOfFirstJobOpening();
});

When('I click the first appeared job opening', async function () {
    await filterComponent.clickFirstJobOpening();
});

When('I return back to the filtered page', async function () {
    await filterComponent.returnToPreviousPage();
});

When('I open new page with current URL', async function () {
    await filterComponent.openPageByCurrentUrl();
});

Then('each name of the first {string} shown items should contain {string} in any register', async function(amountOfItems, name) {
    let arrayOfNamesOfJobs = await filterComponent.getArrayOfNamesOfJobsInLowerCase(amountOfItems);
    arrayOfNamesOfJobs.forEach(function (element) {
        chai.expect(element.includes(name.toString().toLowerCase())).to.be.true;
    })
});

Then('each location of the first {string} shown items should contain {string} in any register', async function(amountOfItems, location) {
    let arrayOfLocationsOfJobs = await filterComponent.getArrayOfLocationsOfJobsInLowerCase(amountOfItems);
    arrayOfLocationsOfJobs.forEach(function (element) {
        let arrayOfCityAndCountry = location.toString().toLowerCase().split(', ');
        chai.expect(element.includes(arrayOfCityAndCountry[0]) || element.includes(arrayOfCityAndCountry[1])).to.be.true;
    })
});

Then('the first {string} shown items should contain {string} icon', async function(amountOfItems, icon) {
    let twoDimensionalArrayOfIconsOfJobs = await filterComponent.twoDimensionalArrayOfIconsOfJobs(amountOfItems);
    twoDimensionalArrayOfIconsOfJobs.forEach(function (element) {
        chai.expect(filterComponent.isIconPresented(element, icon.toString())).to.be.true;
    })
})

Then('Error message is not displayed', async function() {
    chai.expect(await filterComponent.isErrorMessageDisplayed()).to.be.false;
})

Then('Error message is displayed', async function() {
    chai.expect(await filterComponent.isErrorMessageDisplayed()).to.be.true;
})

Then('Filter result heading does not change', async function() {
    chai.assert.equal(await filterComponent.filterResultHeading.getText(), filterComponent.filterResultHeadingText);
})

Then('name of the job opening on the job page equals name of the remembered from filter job opening', async function() {
    chai.assert.equal(await filterComponent.getJobOpeningNameOnJobPage(), filterComponent.firstJobOpeningName);
})