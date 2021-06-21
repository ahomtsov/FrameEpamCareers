'use strict';

const BasePage = require('./BasePage.js');
const baseElements = require('../helpers/elements/BaseElements.js');
const waiters = require('../helpers/waiters.js');
const { browser, element, by } = require('protractor');

class JobPage extends BasePage {
    constructor() {
        super();
        this.learnMoreAboutEpamButton = element(by.css('.vacancy-page__local-site-button'));
        this.learnMoreAboutEpamPageUrl = 'https://careers.epam.by/';
        this.relatedJobOpeningsButtons = element.all(by.css('.related-vacancies-and-trainings__item'));
        this.dayInLifeButtons = element.all(by.css('.responsive-image__link'));
        this.contactUsButton = element(by.css('.button__content.button__content--desktop'));
        this.relatedJobOpeningsNames = element.all(by.css('.related-vacancies-and-trainings__title'));
        this.firstRelatedJobOpeningName = '';
        this.jobOpeningName = element(by.css('.recruiting-page__header h1'));
        this.personsNamesInDaySection = element.all(by.css('.color-light-blue'));
        this.nameOfFirstPersonInDaySection = '';
        this.nameOfPersonOnDayInLifePage = element(by.css('.detail-page-author__name'));
        this.titleTextOnContactUsPage = element(by.css('.title-ui.title--center.title--mixed-case'));
    }

    async clickLearnMoreAboutEpamBtn() {
        await baseElements.click(this.learnMoreAboutEpamButton);
        await waiters.waitUntilUrlIs(this.learnMoreAboutEpamPageUrl);
    }

    async setNameOfFirstRelatedJobOpening() {
        this.firstRelatedJobOpeningName = await this.relatedJobOpeningsNames.get(0).getText();
    }

    async setNameOfFirstPersonInDaySection() {
        let nameOfPerson = await this.personsNamesInDaySection.get(0).getText();
        this.nameOfFirstPersonInDaySection = nameOfPerson.toLowerCase();
    }

    async clickFirstRelatedJobOpeningBtn() {
        await baseElements.click(this.relatedJobOpeningsButtons.get(0));
        await waiters.waitUntilIsVisible(this.jobOpeningName);
    }

    async clickFirstPersonInDaySection() {
        await baseElements.click(this.dayInLifeButtons.get(0));
        await waiters.waitUntilIsVisible(this.nameOfPersonOnDayInLifePage);
    }

    async clickContactUsBtn() {
        await baseElements.click(this.contactUsButton);
        await waiters.waitUntilIsVisible(this.titleTextOnContactUsPage);
    }

    async getJobOpeningNameOnJobPage() {
        let nameToRefactor = await this.jobOpeningName.getText()
        let jobName = nameToRefactor.split(/\r?\n/)[0];
        return jobName;
    }

    async getTitleInLowerCase() {
        let title = await this.getTitle();
        return title.toLowerCase();
    }

}
module.exports = new JobPage();