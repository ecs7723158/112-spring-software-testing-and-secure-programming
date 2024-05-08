const assert = require('assert');
const { Calculator } = require('./main');

describe('Calculator', () => {
    const calculator = new Calculator();

    // 對 exp 方法進行測試
    describe('exp', () => {
        // 測試
        it('should return the correct result for valid input', () => {
            assert.strictEqual(calculator.exp(0), 1);
            assert.strictEqual(calculator.exp(1), Math.exp(1));
            assert.strictEqual(calculator.exp(2), Math.exp(2));
            assert.strictEqual(calculator.exp(-1), Math.exp(-1));
        });


        it('should throw an error for overflow', () => {
            assert.throws(() => calculator.exp(1000), Error);
        });
    });

    // 對 log 方法進行測試
    describe('log', () => {
        // 測試用例
        it('should return the correct result for valid input', () => {
            assert.strictEqual(calculator.log(1), 0);
            assert.strictEqual(calculator.log(Math.exp(1)), 1);
            assert.strictEqual(calculator.log(Math.exp(2)), 2);
            assert.strictEqual(calculator.log(Math.exp(-1)), -1);
        });

        it('should throw an error for invalid input', () => {
            assert.throws(() => calculator.log(-1), Error);
            assert.throws(() => calculator.log(0), Error);
        });

        it('should throw an error for math domain errors', () => {
            assert.throws(() => calculator.log(-1), Error);
            assert.throws(() => calculator.log(0), Error);
        });
    });
});
