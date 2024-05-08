const assert = require('assert');
const { Calculator } = require('./main');

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
            assert.throws(() => calculator.exp('abc'), Error);
            assert.throws(() => calculator.exp(NaN), Error);
            assert.throws(() => calculator.exp(Infinity), Error);
        });

        it('should throw an error for overflow', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.exp(1000), Error);
        });
    });

    describe('log()', () => {
        it('should return the correct result for valid input', () => {
            const calculator = new Calculator();
            assert.strictEqual(calculator.log(1), 0);
            assert.strictEqual(calculator.log(Math.exp(1)), 1);
            assert.strictEqual(calculator.log(Math.exp(2)), 2);
            assert.strictEqual(calculator.log(Math.exp(-1)), -1);
        });

        it('should throw an error for invalid input', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log('abc'), Error);
            assert.throws(() => calculator.log(NaN), Error);
            assert.throws(() => calculator.log(-1), Error);
            assert.throws(() => calculator.log(0), Error);
        });

        it('should throw an error for math domain errors', () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log(-1), Error);
            assert.throws(() => calculator.log(0), Error);
        });
    });
});
