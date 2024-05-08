const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here

describe('Calculator', () => {
    describe('exp()', () => {
        it('should return the correct result for valid input', () => {
            const calculator = new Calculator();
            assert.strictEqual(calculator.exp(0), 1);
            assert.strictEqual(calculator.exp(1), Math.exp(1));
            assert.strictEqual(calculator.exp(2), Math.exp(2));
            assert.strictEqual(calculator.exp(-1), Math.exp(-1));
        });

        it('should throw an error for invalid input', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.exp('oscar'), Error);
            assert.throws(() => calculator.exp(non), Error);
            assert.throws(() => calculator.exp(i), Error);
            assert.throws(() => calculator.exp(-i), Error);
        });

        it('should throw an error for overflow', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.exp(1000), Error);
        });
    });

    describe('log()', () => {
        it('should return the correct result for valid input', () => {
            const calculator = new Calculator();
            assert.strictEqual(calculator.log(10), Math.log(10));
            assert.strictEqual(calculator.log(100), Math.log(100));
            assert.strictEqual(calculator.log(1000), Math.log(1000));
            assert.strictEqual(calculator.log(0.5), Math.log(0.5));
        });

        it('should throw an error for invalid input', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log('oscar'), Error);
            assert.throws(() => calculator.log(-1), Error);
            assert.throws(() => calculator.log(0), Error);
            assert.throws(() => calculator.log(i), Error);
            assert.throws(() => calculator.log(-i), Error);
        });

        it('should throw an error for math domain errors', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log(-1), Error);
            assert.throws(() => calculator.log(0), Error);
        });
    });
});
