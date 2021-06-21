const {browser} = require("protractor");

class Helpers {
    constructor() {}

    async reloadPage() {
        await browser.refresh();
    }

    async scrollTo(element) {
        await browser.actions().mouseMove(element).perform();
        await browser.executeScript('arguments[0].scrollIntoView({behavior: "smooth", block: "start"});', element.getWebElement());
    }

}

module.exports = new Helpers();