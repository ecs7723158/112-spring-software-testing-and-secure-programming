const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

test('Application: selectNextPerson() should select a person from the list', (t) => {
    const app = new Application();
    app.people = ['Alice', 'Bob', 'Charlie'];
    const person = app.selectNextPerson();
    t.assert(['Alice', 'Bob', 'Charlie'].includes(person));
});

test('Application: notifySelected() should write and send emails to selected people', (t) => {
    const mailSystemMock = {
        write: () => 'Mail content',
        send: () => true
    };
    const app = new Application();
    app.mailSystem = mailSystemMock;
    app.selected = ['Alice', 'Bob', 'Charlie'];
    app.notifySelected();
    t.assert(app.mailSystem.write.calledThrice);
    t.assert(app.mailSystem.send.calledThrice);
});

test('MailSystem: send() should return true for successful email sending', (t) => {
    const mailSystem = new MailSystem();
    const result = mailSystem.send('Alice', 'Mail content');
    t.assert.strictEqual(result, true);
});

test('MailSystem: send() should return false for failed email sending', (t) => {
    const mailSystem = new MailSystem();
    const randomStub = t.stub(Math, 'random').returns(0.3);
    const result = mailSystem.send('Alice', 'Mail content');
    t.assert.strictEqual(result, false);
    randomStub.restore(); 
});
