const {When, Then, Given, AfterStep, Status, BeforeAll, setDefaultTimeout} = require('@cucumber/cucumber');
const {by, element, browser, ExpectedConditions} = require("protractor");
const chai = require('chai');
const careersPage = require('../pages/CareersPage.js');
const jobPage = require('../pages/JobPage.js');

setDefaultTimeout(15000);

Given('I open EPAM Careers page', async function () {
    await careersPage.go(careersPage.pageUrlAddress);
});

When('I click the {string} button from {string} section', async function(btnName, sectionName) {
    await careersPage.clickButtonByBtnNameAndSectionName(btnName, sectionName);
});

When('I click the Instagram title button', async function() {
    await careersPage.clickInstagramTitleButton();
    await careersPage.goToInstagramPage();
});

When('I click the {string} button about {string} from {string} section', async function (btnName, personName, sectionName) {
    await careersPage.openStoryPage(btnName, personName, sectionName);
});

Then('the title should be {string}', async function(title) {
    chai.assert.equal(await careersPage.getTitle(), title);
});

Then('the title of a new tab should contain {string}', async function(expectedPartOfTitle) {
    let actualTitle = await careersPage.getTitle();
    chai.expect(actualTitle.includes(expectedPartOfTitle)).to.be.true;
});

Then('the URL of a new tab should contain {string}', async function(expectedPartOfUrl) {
    let actualUrl = await careersPage.getUrl();
    chai.expect(actualUrl.includes(expectedPartOfUrl)).to.be.true;
})

When('I click the Learn more about EPAM button', async function() {
    await jobPage.clickLearnMoreAboutEpamBtn();
});

When('I remember name of the first related job opening', async function() {
    await jobPage.setNameOfFirstRelatedJobOpening();
});

When('I click the first related job opening button', async function() {
    await jobPage.clickFirstRelatedJobOpeningBtn();
});

When('I remember name of the first person in A day in the life section', async function() {
    await jobPage.setNameOfFirstPersonInDaySection();
});

When('I click the first person from A day in the life section', async function() {
    await jobPage.clickFirstPersonInDaySection();
});

When('I click the Contact us button', async function() {
    await jobPage.clickContactUsBtn();
});

Then('name of the job opening on the job page equals name of the remembered related job opening', async function() {
    chai.assert.equal(await jobPage.getJobOpeningNameOnJobPage(), jobPage.firstRelatedJobOpeningName);
})

Then('title of the new page equals name of the remembered person', async function() {
    chai.assert.equal(await jobPage.getTitleInLowerCase(), jobPage.nameOfFirstPersonInDaySection);
})