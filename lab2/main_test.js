const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

test('MailSystem: write() should return the correct mail context', (t) => {
    const mailSystem = new MailSystem();
    const context = mailSystem.write('John');
    t.strictEqual(context, 'Congrats, John!');
});

test('MailSystem: send() should return true for successful email sending', (t) => {
    const mailSystem = new MailSystem();
    const result = mailSystem.send('John', 'Mail content');
    t.strictEqual(result, true);
});

test('MailSystem: send() should return false for failed email sending', (t) => {
    const mailSystem = new MailSystem();
    const randomStub = t.stub(Math, 'random').returns(0.3);
    const result = mailSystem.send('John', 'Mail content');
    t.strictEqual(result, false);
    randomStub.restore(); 
});

test('Application: getRandomPerson() should return a person from the list', (t) => {
    const app = new Application();
    app.people = ['Alice', 'Bob', 'Charlie'];
    const person = app.getRandomPerson();
    t.assert(['Alice', 'Bob', 'Charlie'].includes(person));
});

test('Application: selectNextPerson() should select a person from the list', (t) => {
    const app = new Application();
    app.people = ['Alice', 'Bob', 'Charlie'];
    app.selected = ['Alice'];
    const person = app.selectNextPerson();
    t.assert(['Bob', 'Charlie'].includes(person));
});

test('Application: notifySelected() should call write and send methods for selected people', (t) => {
    const mailSystemMock = {
        write: test.mock.fn(),
        send: test.mock.fn(),
    };
    const app = new Application();
    app.mailSystem = mailSystemMock;
    app.selected = ['Alice', 'Bob', 'Charlie'];
    app.notifySelected();
    t.strictEqual(app.mailSystem.write.calls.length, 3);
    t.strictEqual(app.mailSystem.send.calls.length, 3);
});
