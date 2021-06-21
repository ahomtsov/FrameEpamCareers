const {browser, ExpectedConditions} = require('protractor');
const defaultTimeout = 15000;

class Waiters {
    constructor() {}

    async waitUntilIsClickable(element, timeout = defaultTimeout) {
        await browser.wait(ExpectedConditions.elementToBeClickable(element), timeout);
    }

    async waitUntilIsVisible(element, timeout = defaultTimeout) {
        await browser.wait(ExpectedConditions.visibilityOf(element), timeout);
    }

    async waitUntilIsNotVisible(element, timeout = defaultTimeout) {
        await browser.wait(ExpectedConditions.invisibilityOf(element), timeout);
    }

    async waitUntilUrlIs(url, timeout = defaultTimeout) {
        await browser.wait(ExpectedConditions.urlIs(url), timeout);
    }

    async waitUntilUrlContains(url, timeout = defaultTimeout) {
        await browser.wait(ExpectedConditions.urlContains(url), timeout);
    }

    async waitUntilTitleIs(titleTextToBe, timeout = defaultTimeout) {
        await browser.wait(ExpectedConditions.titleIs(titleTextToBe), timeout);
    }

    async waitUntilInDom(element, timeout = defaultTimeout) {
        await browser.wait(ExpectedConditions.presenceOf(element), timeout).catch(error => {
            return new Error(`Timeout: waiting for presence of: ${element.locator()}`);
        });
    }

}

module.exports = new Waiters();