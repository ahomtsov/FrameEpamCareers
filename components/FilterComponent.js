'use strict';

const baseElements = require('../helpers/elements/BaseElements.js');
const helpers = require('../helpers/helpers.js');
const waiters = require('../helpers/waiters.js');
const BasePageClass = require('../pages/BasePage.js');
const basePage = new BasePageClass();
const { browser, element, by } = require('protractor');

class FilterComponent {
    constructor() {
        this['Keyword field'] = element(by.css('#new_form_job_search_1445745853_copy-keyword'));
        this.locationField = element(by.css('.select2-selection__rendered'));
        this['Location field'] = element(by.css('.select2-selection__rendered'));
        this.checkboxes = element.all(by.css('.recruiting-search__filter-label.checkbox-custom-label'));
        this['Open to Relocation checkbox'] = this.checkboxes.get(0);
        this['Office checkbox'] = this.checkboxes.get(1);
        this['Remote checkbox'] = this.checkboxes.get(2);
        this.findButton = element(by.css('.recruiting-search__submit'));
        this['All Locations value'] = element(by.xpath('//li[contains(text(), "All Locations")]'));
        this.firstPartOfCountryLocationButtonXpath = '//*[@class = "select2-results__group"][contains(text(), "';
        this.secondPartOfCountryLocationButtonXpath = '")]';
        this.firstPartOfCityLocationButtonXpath = '//li[contains(text(), "';
        this.secondPartOfCityLocationButtonXpath = '")]';
        this.firstPartOfCitiesListboxXpath = '//*[@aria-label = "';
        this.secondPartOfCitiesListboxXpath = '"]/ul';
        this.namesOfJobs = element.all(by.css('.search-result__item-name'));
        this.locationsOfJobs = element.all(by.css('.search-result__location'));
        this.firstPartOfIconsOfJobXpath = '//*[@class = "search-result__list"]/li[';
        this.secondPartOfIconsOfJobXpath = ']//*[@class = "search-result__item-types"]/li/span[contains(@class, "search-result__item-icon tooltip")]';
        this.errorMessage = element(by.css('.search-result__error-message'));
        this['Filter result heading'] = element(by.css('.search-result__heading'));
        this['Filter result heading text'] = '';
        this.firstAppearedJobOpening = element.all(by.xpath('//*[contains(text(), "View and apply")]')).get(0);
        this.jobOpeningsNames = element.all(by.css('.search-result__item-name'));
        this['name of the job opening'] = '';
        this.jobOpeningNameOnJobPage = element(by.css('.recruiting-page__header h1'));
    }

    async clickFindButton() {
        await baseElements.click(this.findButton);
        await browser.sleep(2000);
    }

    async clickFirstAppearedJobOpening() {
        await baseElements.click(this.firstAppearedJobOpening);
    }

    async setLocationInLocationField(country, city) {
        await baseElements.click(this.locationField);
        let classValueOfCitiesDropdownListElement = await element(by.xpath(this.firstPartOfCitiesListboxXpath + country + this.secondPartOfCitiesListboxXpath)).getAttribute('class');
        let countryLocationButton = await element(by.xpath(this.firstPartOfCountryLocationButtonXpath + country + this.secondPartOfCountryLocationButtonXpath));
        let cityLocationButton = await element(by.xpath(this.firstPartOfCityLocationButtonXpath + city + this.secondPartOfCityLocationButtonXpath));
        if (!classValueOfCitiesDropdownListElement.includes('open')) await baseElements.click(countryLocationButton);
        await baseElements.click(cityLocationButton);
    }

    async refreshPage() {
        await helpers.reloadPage();
        await waiters.waitUntilIsVisible(this['Filter result heading']);
    }

    async ['set Filter result heading']() {
        this['Filter result heading text'] = await this['Filter result heading'].getText();
    }

    async ['set Name of the first appeared job opening']() {
        this['name of the job opening'] = await this.jobOpeningsNames.get(0).getText();
    }

    async openPageByCurrentUrl() {
        await basePage.go(await basePage.getUrl());
        await waiters.waitUntilIsVisible(this['Filter result heading']);
    }

    async returnToPreviousPage() {
        await browser.navigate().back();
        await waiters.waitUntilIsVisible(this['Filter result heading']);
    }

    async ['get name of the job opening on the job page']() {
        let nameToRefactor = await this.jobOpeningNameOnJobPage.getText()
        let jobName = nameToRefactor.split(/\r?\n/)[0];
        return jobName;
    }

    async getArrayOfNamesOfJobsInLowerCase(amountOfJobs) {
        let amount = parseInt(amountOfJobs);
        let arrayOfNames = [];
        for (let i = 0; i < amount; i++) {
            arrayOfNames[i] = await this.namesOfJobs.get(i).getText();
        }
        arrayOfNames.forEach(function (element, index) {
            arrayOfNames[index] = element.toString().toLowerCase();
        })
        return arrayOfNames;
    }

    async getArrayOfLocationsOfJobsInLowerCase(amountOfJobs) {
        let amount = parseInt(amountOfJobs);
        let arrayOfLocations = [];
        for (let i = 0; i < amount; i++) {
            arrayOfLocations[i] = await this.locationsOfJobs.get(i).getText();
        }
        arrayOfLocations.forEach(function (element, index) {
            arrayOfLocations[index] = element.toString().toLowerCase();
        })
        return arrayOfLocations;
    }

    async twoDimensionalArrayOfIconsOfJobs(amountOfJobs) {
        browser.sleep(2000);
        let amount = parseInt(amountOfJobs);
        let twoDimensionalArrayOfIcons = [];
        for (let i = 1; i <= amount; i++) {
            let iconsOfJob = element.all(by.xpath(this.firstPartOfIconsOfJobXpath + i + this.secondPartOfIconsOfJobXpath));
            for (let j = 0; j < iconsOfJob.count(); j++) {
                twoDimensionalArrayOfIcons[i - 1] = [];
                twoDimensionalArrayOfIcons[i - 1][j] = iconsOfJob.get(j).getAttribute('data-title')
            }
        }
        return twoDimensionalArrayOfIcons;
    }

    async isIconPresented(arrOfIcons, iconName) {
        let isPresented = false;
        for (let i = 0; i < arrOfIcons.length; i++) {
            if (arrOfIcons[i] === iconName) isPresented = true;
        }
        return isPresented;
    }


    async isErrorMessageDisplayed() {
        let isPresented = false;
        if (await this.errorMessage.getAttribute('style') === 'display: block;') isPresented = true;
        return isPresented;
    }

}
module.exports = new FilterComponent();