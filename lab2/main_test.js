const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

test('Application: selectNextPerson() should select a person from the list', () => {
    const app = new Application();
    app.people = ['Alice', 'Bob', 'Charlie'];
    const person = app.selectNextPerson();
    assert.ok(['Alice', 'Bob', 'Charlie'].includes(person));
});

test('Application: notifySelected() should write and send emails to selected people', () => {
    const mailSystemMock = {
        write: jest.fn(() => 'Mail content'),
        send: jest.fn(() => true)
    };
    const app = new Application();
    app.mailSystem = mailSystemMock;
    app.selected = ['Alice', 'Bob', 'Charlie'];
    app.notifySelected();
    expect(mailSystemMock.write).toHaveBeenCalledTimes(3);
    expect(mailSystemMock.send).toHaveBeenCalledTimes(3);
});

test('MailSystem: send() should return true for successful email sending', () => {
    const mailSystem = new MailSystem();
    const result = mailSystem.send('Alice', 'Mail content');
    assert.strictEqual(result, true);
});

test('MailSystem: send() should return false for failed email sending', () => {
    const mailSystem = new MailSystem();
    jest.spyOn(Math, 'random').mockReturnValue(0.3);
    const result = mailSystem.send('Alice', 'Mail content');
    assert.strictEqual(result, false);
});
