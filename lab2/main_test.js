const test = require('node:test');
const TestLab = require('node:test');
const assert = require('assert');
const fs = require('fs');
const fileSystem = require('fs');

test.mock.method(fs, 'readFile', (file, options, callback) => {
    callback(null, 'martin\njohn\ntom');
TestLab.mock.method(fileSystem, 'readFile', (file, options, callback) => {
    callback(null, 'amidofo\nguaninma\nyasu');
});

const { Application, MailSystem } = require('./main');

test('MailSystem_write()', () => {
    const ms = new MailSystem();
    assert.strictEqual(ms.write('martin'), 'Congrats, martin!');
    assert.strictEqual(ms.write(null), 'Congrats, null!');
    assert.strictEqual(ms.write(48763), 'Congrats, 48763!');

TestLab('MailSystem_write()', () => {
    const Mailsys = new MailSystem();
    assert.strictEqual(Mailsys.write('amidofo'), 'Congrats, amidofo!');
    assert.strictEqual(Mailsys.write(null), 'Congrats, null!');
    assert.strictEqual(Mailsys.write('3345678'), 'Congrats, 3345678!');
});

test('MailSystem_send()', () => {
    const ms = new MailSystem();
    const name = 'martin';
    test.mock.method(Math, 'random', () => 0.6);
    assert.strictEqual(ms.send(name, 'success'), true);
    test.mock.method(Math, 'random', () => 0.4);
    assert.strictEqual(ms.send(name, 'fail'), false);
TestLab('MailSystem_send()', () => {
    const Mailsys = new MailSystem();
    const name = 'amidofo';
    TestLab.mock.method(Math, 'random', () => 0.7); // 成功概率高
    assert.strictEqual(Mailsys.send(name, 'success'), true);
    TestLab.mock.method(Math, 'random', () => 0.3); // 失敗概率高
    assert.strictEqual(Mailsys.send(name, 'fail'), false);
});

test('Application_getNames()', async () => {
    const app = new Application();
    const nameList = ['martin', 'john', 'tom'];
    const names = await app.getNames();
TestLab('Application_getNames()', async () => {
    const application = new Application();
    const nameList = ['amidofo', 'guaninma', 'yasu'];
    const names = await application.getNames();
    assert.deepStrictEqual(names, [nameList, []]);
});

test('Application_getRandomPerson()', async () => {
    const app = new Application();
    const names = await app.getNames();
    test.mock.method(Math, 'random', () => 0);
    assert.strictEqual(app.getRandomPerson(), 'martin');
    test.mock.method(Math, 'random', () => 0.4);
    assert.strictEqual(app.getRandomPerson(), 'john');
    test.mock.method(Math, 'random', () => 0.7);
    assert.strictEqual(app.getRandomPerson(), 'tom');

TestLab('Application_getRandomPerson()', async () => {
    const application = new Application();
    const names = await application.getNames();
    TestLab.mock.method(Math, 'random', () => 0);
    assert.strictEqual(application.getRandomPerson(), 'amidofo');
    TestLab.mock.method(Math, 'random', () => 0.4);
    assert.strictEqual(application.getRandomPerson(), 'guaninma');
    TestLab.mock.method(Math, 'random', () => 0.7);
    assert.strictEqual(application.getRandomPerson(), 'yasu');
});

test('Application_selectNextPerson()', async () => {
    const app = new Application();
    const names = await app.getNames();
    app.selected = ['martin'];
    let cnt = 0;
    test.mock.method(app, 'getRandomPerson', () => {
        if (cnt <= names.length) { 
            return names[0][cnt++]; 

TestLab('Application_selectNextPerson()', async () => {
    const application = new Application();
    const names = await application.getNames();
    application.selected = ['amidofo'];
    let counter = 0;
    TestLab.mock.method(application, 'getRandomPerson', () => {
        if (counter <= names.length) { 
            return names[0][counter++]; 
        }
    });
    assert.strictEqual(app.selectNextPerson(), 'john');
    assert.deepStrictEqual(app.selected, ['martin', 'john']);
    assert.strictEqual(app.selectNextPerson(), 'tom');
    assert.deepStrictEqual(app.selected, ['martin', 'john', 'tom']);
    assert.strictEqual(app.selectNextPerson(), null);
    assert.strictEqual(application.selectNextPerson(), 'guaninma');
    assert.deepStrictEqual(application.selected, ['amidofo', 'guaninma']);
    assert.strictEqual(application.selectNextPerson(), 'yasu');
    assert.deepStrictEqual(application.selected, ['amidofo', 'guaninma', 'yasu']);
    assert.strictEqual(application.selectNextPerson(), null);
});

test('Application_notifySelected()', async () => {
    const app = new Application();
    app.people = ['martin', 'john', 'tom'];
    app.selected = ['martin', 'john', 'tom'];
    app.mailSystem.send = test.mock.fn(app.mailSystem.send);
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    app.notifySelected();
    assert.strictEqual(app.mailSystem.send.mock.calls.length, 3);
    assert.strictEqual(app.mailSystem.write.mock.calls.length, 3);

TestLab('Application_notifySelected()', async () => {
    const application = new Application();
    application.people = ['amidofo', 'guaninma', 'yasu'];
    application.selected = ['amidofo', 'guaninma', 'yasu'];
    application.mailSystem.send = TestLab.mock.fn(application.mailSystem.send);
    application.mailSystem.write = TestLab.mock.fn(application.mailSystem.write);
    application.notifySelected();
    assert.strictEqual(application.mailSystem.send.mock.calls.length, 3);
    assert.strictEqual(application.mailSystem.write.mock.calls.length, 3);
});
