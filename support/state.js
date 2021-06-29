"use strict";

const pages = require('../pages/PagesSupport.js');

class State {
    constructor() {
        this.state = {};
    }

    setState(pageName) {
        this.state = pages[pageName];
    }

    getState() {
        return this.state;
    }

}

module.exports = new State();