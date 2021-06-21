'use strict';

const BasePage = require('./BasePage.js');
const baseElements = require('../helpers/elements/BaseElements.js');
const waiters = require('../helpers/waiters.js');
const { browser, element, by } = require('protractor');

class CareersPage extends BasePage {
    constructor() {
        super();
        this.pageUrlAddress = 'https://www.epam.com/careers';
        this.firstPartOfSectionButtonXpath = '//div[@class="title"][*[contains(.,"';
        this.secondPartOfSectionButtonXpath = '")]]/..//a[contains(.,"';
        this.thirdPartOfSectionButtonXpath = '")]';
        this.instagramTitleButtons = element.all(by.xpath('//*[@class = "instagram-feed__head"]'));
        this.sliderNavButtonsWhoWeAreSection = element.all(by.css('.slider__navigation button'));
    }

    async clickButtonByBtnNameAndSectionName(btnName, sectionName) {
        await baseElements.click(element(by.xpath(this.firstPartOfSectionButtonXpath + sectionName + this.secondPartOfSectionButtonXpath + btnName + this.thirdPartOfSectionButtonXpath)));
    }

    async clickInstagramTitleButton() {
        await baseElements.click(this.instagramTitleButtons.get(0));
    }

    async goToInstagramPage() {
        let windowHandles = await browser.getAllWindowHandles();
        await browser.switchTo().window(windowHandles[1]);
        await waiters.waitUntilUrlContains('instagram');
    }

    async openStoryPage(btnName, personName, sectionName) {
        await baseElements.click(element.all(by.xpath(
            this.firstPartOfSectionButtonXpath + sectionName + this.secondPartOfSectionButtonXpath + btnName + this.thirdPartOfSectionButtonXpath)).get(2)
        );  //first two buttons are useless, they actually are not shown in the slider nav
    }

}
module.exports = new CareersPage();