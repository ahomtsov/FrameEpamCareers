'use strict';

const BasePage = require('./BasePage.js');
const baseElements = require('../helpers/elements/BaseElements.js');
const waiters = require('../helpers/waiters.js');
const { browser, element, by } = require('protractor');

class JobPage extends BasePage {
    constructor() {
        super();
        this['Learn more about EPAM'] = element(by.css('.vacancy-page__local-site-button'));
        this['first related job opening'] = element.all(by.css('.related-vacancies-and-trainings__item')).get(0);
        this['first person from A day in the life section'] = element.all(by.css('.responsive-image__link')).get(0);
        this['Contact us'] = element(by.css('.button__content.button__content--desktop'));
        this.firstRelatedJobOpening = element.all(by.css('.related-vacancies-and-trainings__title')).get(0);
        this.firstPersonDayInLifeSection = element.all(by.css('.color-light-blue')).get(0);
        this.jobOpening = element(by.css('.recruiting-page__header h1'));

        this['expected element after clicking the Learn more about EPAM button'] = element(by.css('.title-ui.title--center.title--mixed-case.color-white.title--bold'));
        this['expected element after clicking the first related job opening button'] = element(by.css('.recruiting-page__header h1'));
        this['expected element after clicking the first person from A day in the life section button'] = element(by.css('.detail-page-author__name'));
        this['expected element after clicking the Contact us button'] = element(by.css('.title-ui.title--center.title--mixed-case'));
    }

    async isLoaded() {
        await waiters.waitUntilIsVisible(this.jobOpening);
        let pageUrl = await this.getUrl();
        return pageUrl.includes('job-listings');
    }

    async getNameOfFirstRelatedJobOpening() {
        return this.firstRelatedJobOpening.getText();
    }

    async getNameOfFirstPersonDayInLifeSection() {
        return this.firstPersonDayInLifeSection.getText().then(value => value.toLowerCase());
    }

    async getNameOfJobOpening() {
        return this.jobOpening.getText().then(value => value.split(/\r?\n/)[0]);
    }

    async getTitleOfNewPage() {
        return this.getTitle().then(value => value.toLowerCase());
    }

}
module.exports = new JobPage();