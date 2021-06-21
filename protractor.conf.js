const fs = require('fs-extra');

exports.config = {
    framework: 'custom',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['./features/**/*.feature'],
    directConnect: true,
    capabilities: {
        browserName: 'chrome'
    },
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        require: [
            './step_definitions/**/*.js'
        ]
    },
    resultJsonOutputFile: './result/result.json',
    getPageTimeout: 50000,
    allScriptsTimeout: 50000,
    onPrepare: () => {
        browser.waitForAngularEnabled(false);
        browser.manage().window().setSize(1920, 1080);
        fs.emptyDirSync('./result');
        browser.manage().addCookie({name: 'epam:cookiesAccepted', value: 'true', domain: 'www.epam.com'});
    }
}