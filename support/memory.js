"use strict";

class Memory {
    constructor() {
        this.buffer = '';
    }

    setBuffer(value) {
        this.buffer = value;
    }

    getBuffer() {
        return this.buffer;
    }

}

module.exports = new Memory();