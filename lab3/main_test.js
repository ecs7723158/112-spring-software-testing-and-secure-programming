const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe("Calculator", () => {
    const cal = new Calculator();

    describe("exp", () => {
        it("should return the correct value for negative exponent", () => {
            assert.strictEqual(cal.exp(-2), Math.exp(-2));
        });

        it("should return the correct value for decimal exponent", () => {
            assert.strictEqual(cal.exp(0.5), Math.exp(0.5));
        });
    });

    describe("log", () => {
        it("should return the correct value for negative number", () => {
            assert.strictEqual(cal.log(0.5), Math.log(0.5));
        });

        it("should return NaN for negative input", () => {
            assert(isNaN(cal.log(-2)));
        });
    });
});
