const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

test('MailSystem: write() should return the correct mail context', () => {
    const mailSystem = new MailSystem();
    const context = mailSystem.write('John');
    assert.strictEqual(context, 'Congrats, John!');
});

test('MailSystem: send() should return true for successful email sending', () => {
    const mailSystem = new MailSystem();
    const result = mailSystem.send('John', 'Mail content');
    assert.strictEqual(result, true);
});

test('MailSystem: send() should return false for failed email sending', () => {
    const mailSystem = new MailSystem();
    // Stubbing Math.random to always return a value below 0.5 for failure case
    const randomStub = test.stub(Math, 'random').returns(0.3);
    const result = mailSystem.send('John', 'Mail content');
    assert.strictEqual(result, false);
    randomStub.restore(); // Restore stubbed Math.random method
});

test('Application: getRandomPerson() should return a person from the list', () => {
    const app = new Application();
    app.people = ['Alice', 'Bob', 'Charlie'];
    const person = app.getRandomPerson();
    assert.ok(['Alice', 'Bob', 'Charlie'].includes(person));
});

test('Application: selectNextPerson() should select a person from the list', () => {
    const app = new Application();
    app.people = ['Alice', 'Bob', 'Charlie'];
    app.selected = ['Alice'];
    const person = app.selectNextPerson();
    assert.ok(['Bob', 'Charlie'].includes(person));
});

test('Application: notifySelected() should call write and send methods for selected people', () => {
    const mailSystemMock = {
        write: test.mock.fn(),
        send: test.mock.fn(),
    };
    const app = new Application();
    app.mailSystem = mailSystemMock;
    app.selected = ['Alice', 'Bob', 'Charlie'];
    app.notifySelected();
    assert.strictEqual(app.mailSystem.write.calls.length, 3);
    assert.strictEqual(app.mailSystem.send.calls.length, 3);
});
