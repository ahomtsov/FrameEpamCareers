'use strict';

const careersPage = require('./CareersPage.js');
const jobPage = require('./JobPage.js');
const instagramPage = require('./InstagramPage.js');


class PagesSupport {
    constructor() {
        this['EPAM Careers'] = careersPage;
        this['Job'] = jobPage;
        this['Instagram'] = instagramPage;
    };
}

module.exports = new PagesSupport();