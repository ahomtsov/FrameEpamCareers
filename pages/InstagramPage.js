'use strict';

const BasePage = require('./BasePage.js');
const waiters = require('../helpers/waiters.js');
const { element, by } = require('protractor');

class InstagramPage extends BasePage {
    constructor() {
        super();
        this.url = 'https://www.instagram.com/epamsystems/';
        this.profileName = element(by.css('._7UhW9.fKFbl.yUEEX.KV-D4.fDxYl'));
    }

    async isLoaded() {
        await waiters.waitUntilIsVisible(this.profileName);
        let pageUrl = await this.getUrl();
        return pageUrl.includes('instagram');
    }
}
module.exports = new InstagramPage();