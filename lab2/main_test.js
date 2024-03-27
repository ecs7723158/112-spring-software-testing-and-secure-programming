const test = require('node:test');
const assert = require('assert');


test.mock.method(require('fs'), 'readFile', (file, options, callback) => {
    
    callback(null, 'Juila\njack\nBan');
});


const { Application, MailSystem } = require('./main');

test('MailSystem_write()', () => {
   
    const ms = new MailSystem();
    assert.strictEqual(ms.write('Julia'), 'Congrats, Julia!');
    assert.strictEqual(ms.write(null), 'Congrats, null!');
    assert.strictEqual(ms.write(), 'Congrats');
});

test('MailSystem_send()', () => {
    const ms = new MailSystem();
    test.mock.method(Math, 'random', () => 0.6);
    assert.strictEqual(ms.send('Julia', 'success'), true);
    test.mock.method(Math, 'random', () => 0.4);
    assert.strictEqual(ms.send('Julia', 'fail'), false);
});

test('Application_getNames()', async () => {
   
    const app = new Application();
  
    const [names] = await app.getNames();
   
    assert.deepStrictEqual(names, ['Julia', 'jack', 'Ban']);
});

test('Application_getRandomPerson()', async () => {
    
    const app = new Application();

    const [names] = await app.getNames();
    
    const randomPerson = app.getRandomPerson();
    
    assert.ok(names.includes(randomPerson));
});


test('Application_selectNextPerson()', async () => {
    
    const app = new Application();
    
    const [names] = await app.getNames();
    
    app.selected = ['Juila'];
    let cnt = 0;
    test.mock.method(app, 'getRandomPerson', () => {
        if (cnt <= names.length) { 
            return names[cnt++]; 
        }
    });
    assert.strictEqual(app.selectNextPerson(), 'jack');
    assert.deepStrictEqual(app.selected, ['Julia', 'jack']);
    assert.strictEqual(app.selectNextPerson(), 'Ban');
    assert.deepStrictEqual(app.selected, ['Julia', 'jack', 'Ban']);
    assert.strictEqual(app.selectNextPerson(), null);
});

test('Application_notifySelected()', async () => {
    const app = new Application();
    const [people] = await app.getNames();
    app.selected = [...people];
    app.mailSystem.send = test.mock.fn(app.mailSystem.send);
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    app.notifySelected();
    assert.strictEqual(app.mailSystem.send.mock.calls.length, people.length);
    assert.strictEqual(app.mailSystem.write.mock.calls.length, people.length);
});
