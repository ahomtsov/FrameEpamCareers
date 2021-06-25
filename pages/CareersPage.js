'use strict';

const BasePage = require('./BasePage.js');
const waiters = require('../helpers/waiters.js');
const { element, by } = require('protractor');
const filterComponent = require('../components/FilterComponent.js');

class CareersPage extends BasePage {
    constructor() {
        super();
        this.url = this.url + '/careers';
        this['Instagram title fields'] = element.all(by.xpath('//*[@class = "instagram-feed__head"]'));
        this['Learn more - Are You Open to Relocating?'] = element(by.css('.section--padding-extra-large .button__content--desktop'));
        this['Learn more - Why join epam'] = element(by.css('.bg-color-light-green .button__content--desktop'));
        this['Learn more - EPAM WITHOUT BORDERS'] = element(by.css('.section-ui.bg-color-light-blue .button__content--desktop'));
        this['Apply - Don\'t see the dream job you were hoping to find?'] = element(by.xpath('//span[@class = "button__content button__content--desktop"][contains(text(), "Apply")]'));
        this.filter = filterComponent;
    }

    async isLoaded() {
        await waiters.waitUntilIsVisible(this['Learn more - Are You Open to Relocating?']);
        let pageUrl = await this.getUrl();
        return pageUrl.includes('careers');
    }

}
module.exports = new CareersPage();