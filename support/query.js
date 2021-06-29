"use strict";

const state = require('./state');

class Query {
    constructor() {}

    getElement(elementName) {
        if (elementName === 'setPersonName') {
            console.log(state.getState());
        }
        return state.getState()[elementName];
    }

}

module.exports = new Query();