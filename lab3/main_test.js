
const { describe, it } = require('mocha');
const assert = require('assert');
const { Calculator } = require('./main');

describe("Calculator", () => {
    const calculator = new Calculator();

    describe("exp", () => {
        it("should calculate exponential values correctly", () => {
            assert.strictEqual(calculator.exp(1), Math.exp(1));
        });

        it("should throw an error for unsupported operand type", () => {
            assert.throws(() => calculator.exp(null), Error, 'unsupported operand type');
        });

        it("should throw an error for overflow", () => {
            assert.throws(() => calculator.exp(Number.MAX_VALUE), Error, 'overflow');
        });
    });

    describe("log", () => {
        it("should calculate logarithmic values correctly", () => {
            assert.strictEqual(calculator.log(1), 0);
        });

        it("should throw an error for unsupported operand type", () => {
            assert.throws(() => calculator.log(null), Error, 'unsupported operand type');
        });

        it("should throw an error for math domain error (1)", () => {
            assert.throws(() => calculator.log(0), Error, 'math domain error (1)');
        });

        it("should throw an error for math domain error (2)", () => {
            assert.throws(() => calculator.log(-1), Error, 'math domain error (2)');
        });
    });
});
