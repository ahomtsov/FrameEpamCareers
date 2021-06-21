'use strict';

const { browser } = require("protractor");

class BasePage {
    constructor() {
        this.timeout = {
            s: 2000,
            m: 4000,
            l: 8000,
            xl: 10000
        }
    }

    async go(url) {
        await browser.get(url);
    }

    async getTitle() {
        return browser.getTitle();
    }

    async getUrl() {
        return browser.getCurrentUrl();
    }
}

module.exports = BasePage;