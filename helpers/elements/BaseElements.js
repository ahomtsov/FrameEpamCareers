'use strict';

const waiters = require('../waiters.js');
const helpers = require('../helpers.js');

class BaseElements {
    constructor() {}

    async click(element, timeout){
        await helpers.scrollTo(element);
        await waiters.waitUntilIsClickable(element, timeout);
        await element.click();
    }

    async sendKeys(element, text, timeout) {
        await waiters.waitUntilIsVisible(element, timeout);
        await element.clear();
        await element.sendKeys(text);
        await browser.sleep(2000)
    }

}

module.exports = new BaseElements();