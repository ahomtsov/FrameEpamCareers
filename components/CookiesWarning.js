const {element, by} = require("protractor");
const baseElements = require('../helpers/elements/BaseElements.js');
const waiters = require('../helpers/waiters.js');

class CookiesWarning {
    constructor() {
        this.acceptCookiesButton = element(by.xpath('//*[text() = "Accept"]'));
    }

    async acceptCookies() {
        if (await this.acceptCookiesButton.isPresent()) await baseElements.click(this.acceptCookiesButton);
    }

}

module.exports = new CookiesWarning();